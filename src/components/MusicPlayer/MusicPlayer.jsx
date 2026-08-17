import { useEffect, useRef, useState } from 'react';
import styles from './MusicPlayer.module.css';

const TRACKS = [
  {
    title: 'Spring Rain',
    artist: 'Oscar Dunbar',
    spotifyUrl: 'https://open.spotify.com/track/5vFcUNUxOZKaHU1H0wDFoo',
    artwork: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02ecd8ab18c5ee31cf62fb0442',
    album: '',
    duration: 260,
  },
  {
    title: 'No Direction',
    artist: 'Rachael Yamagata',
    spotifyUrl: 'https://open.spotify.com/track/7njTGO45SkaBTNu35t2Yq0',
    artwork: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e0215c8ed0db57fb7aa6f78d724',
    album: '',
    duration: 234,
  },
  {
    title: 'Dealbreaker',
    artist: 'Rachael Yamagata',
    spotifyUrl: 'https://open.spotify.com/track/2dyZe2rAzWVqVcRaS1QPXL',
    artwork: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02e4ecb52799c9155e5ed61b55',
    album: '',
    duration: 347,
  },
  {
    title: 'Best Friend',
    artist: 'Rex Orange County',
    spotifyUrl: 'https://open.spotify.com/track/3rPtS4nfpy7PsARctAWpzd',
    artwork: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02ff874602e13e9181c26e5f01',
    album: '',
    duration: 262,
  },
  {
    title: 'Nuts',
    artist: 'RM',
    spotifyUrl: 'https://open.spotify.com/track/2sR1e5YFAvXVN6EiIwR2is',
    artwork: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e027093cd0ee6043740f73e54d9',
    album: '',
    duration: 195,
  },
];

const PLAYLIST_URL = 'https://open.spotify.com/playlist/6FaDfcyJMbXzLqcJrpzp9P';

const getTrackId = (url) => url.split('/track/')[1];
const embedUrl = (id) => `https://open.spotify.com/embed/track/${id}`;

// Spotify reports position/duration in milliseconds; guard against seconds.
const toSeconds = (value) => (value > 1000 ? value / 1000 : value);

const formatTime = (seconds) => {
  if (!seconds || !isFinite(seconds) || seconds < 0) return '0:00';
  const total = Math.floor(seconds);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
};

const MusicPlayer = () => {
  const iframeRef = useRef(null);
  const readyRef = useRef(false);
  const pendingToggleRef = useRef(false);
  // Anchor for smooth interpolation: last real position reported by Spotify
  // (or a seek) + the wall-clock time it was observed.
  const lastSyncRef = useRef({ position: 0, time: 0 });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(TRACKS[0].duration || 0);

  const track = TRACKS[currentIndex];
  const safeDuration = duration > 0 ? duration : 1;
  const progressPercent = duration > 0 ? Math.min((position / duration) * 100, 100) : 0;

  // Real Spotify embed messages drive state. The audio (embed) is the source
  // of truth; we only interpolate between its real reports for smooth visuals.
  useEffect(() => {
    const onMessage = (e) => {
      const iframe = iframeRef.current;
      if (!iframe || e.source !== iframe.contentWindow) return;
      const data = e.data;
      if (!data || typeof data !== 'object') return;

      const type = data.type || (data.payload && data.payload.type);
      if (type === 'ready') {
        readyRef.current = true;
        if (pendingToggleRef.current) {
          pendingToggleRef.current = false;
          iframe.contentWindow.postMessage({ command: 'toggle' }, '*');
          setIsPlaying(true);
        }
      } else if (type === 'play') {
        setIsPlaying(true);
      } else if (type === 'pause') {
        setIsPlaying(false);
      }

      const payload = data.payload || {};
      if (typeof payload.position === 'number') {
        const posSec = toSeconds(payload.position);
        setPosition(posSec);
        lastSyncRef.current = { position: posSec, time: performance.now() };
      }
      if (typeof payload.duration === 'number' && payload.duration > 0) {
        setDuration(toSeconds(payload.duration));
      }
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  // Re-anchor the interpolation clock whenever playback (re)starts so the
  // progress bar continues from the real current position.
  useEffect(() => {
    if (isPlaying) {
      lastSyncRef.current = { position, time: performance.now() };
    }
  }, [isPlaying]);

  // Smooth progress between Spotify's real reports. Every real message or seek
  // re-anchors lastSyncRef, so the audio always remains the source of truth.
  useEffect(() => {
    if (!isPlaying) return;
    const id = setInterval(() => {
      const base = lastSyncRef.current;
      const delta = (performance.now() - base.time) / 1000;
      setPosition(base.position + delta);
    }, 200);
    return () => clearInterval(id);
  }, [isPlaying]);

  const togglePlay = () => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    if (!readyRef.current) {
      pendingToggleRef.current = !pendingToggleRef.current;
      return;
    }
    iframe.contentWindow.postMessage({ command: 'toggle' }, '*');
    setIsPlaying((prev) => !prev);
  };

  const changeTrack = (index) => {
    if (index === currentIndex) return;
    setCurrentIndex(index);
    setPosition(0);
    lastSyncRef.current = { position: 0, time: performance.now() };
    setDuration(TRACKS[index].duration || 0);
    readyRef.current = false;
    pendingToggleRef.current = true; // auto-play the new track once it's ready
  };

  const nextTrack = () => changeTrack((currentIndex + 1) % TRACKS.length);
  const prevTrack = () => changeTrack((currentIndex - 1 + TRACKS.length) % TRACKS.length);

  const handleSeek = (e) => {
    const iframe = iframeRef.current;
    const value = Number(e.target.value);
    setPosition(value); // immediate visual feedback
    lastSyncRef.current = { position: value, time: performance.now() };
    if (iframe && readyRef.current) {
      // Real audio seek — the embed jumps to this position and reports back.
      // Send both position/timestamp keys to cover the embed's expected format.
      iframe.contentWindow.postMessage(
        { command: 'seek', position: value, timestamp: value },
        '*'
      );
    }
  };

  return (
    <div className={styles.container}>
      <p className={styles.label}>Currently Listening to:</p>

      <div className={styles.playerCard}>
        <div className={styles.trackInfo}>
          <a
            href={track.spotifyUrl}
            target="_blank"
            rel="noreferrer"
            className={styles.artLink}
            aria-label={`Open ${track.title} by ${track.artist} on Spotify`}
          >
            {track.artwork ? (
              <img src={track.artwork} alt="" className={styles.albumArt} />
            ) : (
              <div className={styles.albumArt} />
            )}
          </a>
          <div className={styles.details}>
            <p className={styles.title}>{track.title}</p>
            <p className={styles.artist}>{track.artist}</p>
          </div>
        </div>

        <div className={styles.progressRow}>
          <span className={styles.time}>{formatTime(position)}</span>
          <input
            type="range"
            className={styles.progress}
            min={0}
            max={safeDuration}
            step={1}
            value={Math.min(position, safeDuration)}
            style={{ '--progress': `${progressPercent}%` }}
            onChange={handleSeek}
            aria-label="Seek through current track"
          />
          <span className={styles.time}>{formatTime(duration)}</span>
        </div>

        <div className={styles.controls}>
          <button className={styles.controlBtn} onClick={prevTrack} aria-label="Previous track">
            <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden="true">
              <path d="M6 5h3v14H6zM20 5v14l-9-7z" />
            </svg>
          </button>
          <button
            className={`${styles.controlBtn} ${styles.playBtn}`}
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
          <button className={styles.controlBtn} onClick={nextTrack} aria-label="Next track">
            <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden="true">
              <path d="M15 5h3v14h-3zM4 5v14l9-7z" />
            </svg>
          </button>
        </div>

        <div className={styles.playlistLink}>
          <a href={PLAYLIST_URL} target="_blank" rel="noreferrer">Open playlist ↗</a>
        </div>
      </div>

      {/* Hidden Spotify embed — the actual audio source, controlled by the custom
          buttons/progress above via postMessage. Off-screen (not display:none) so
          audio can still play. The key forces a reload when the track changes. */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          left: '-9999px',
          top: '0',
          width: '300px',
          height: '152px',
          pointerEvents: 'none',
        }}
      >
        <iframe
          key={track.spotifyUrl}
          ref={iframeRef}
          src={embedUrl(getTrackId(track.spotifyUrl))}
          width="300"
          height="152"
          style={{ border: 'none' }}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          title="Spotify player"
        />
      </div>
    </div>
  );
};

export default MusicPlayer;
