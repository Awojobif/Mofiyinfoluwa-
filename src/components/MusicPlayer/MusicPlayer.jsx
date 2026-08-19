import { useEffect, useRef, useState } from 'react';
import styles from './MusicPlayer.module.css';

const TRACKS = [
  {
    title: 'Spring Rain',
    artist: 'Oscar Dunbar',
    youtubeId: 'pmU4963Trdc',
    artwork: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02ecd8ab18c5ee31cf62fb0442',
    album: '',
    duration: 260,
  },
  {
    title: 'No Direction',
    artist: 'Rachael Yamagata',
    youtubeId: 'to90Ku_xK8s',
    artwork: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e0215c8ed0db57fb7aa6f78d724',
    album: '',
    duration: 234,
  },
  {
    title: 'Dealbreaker',
    artist: 'Rachael Yamagata',
    youtubeId: 'Th2QRlrP8RM',
    artwork: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02e4ecb52799c9155e5ed61b55',
    album: '',
    duration: 347,
  },
  {
    title: 'Best Friend',
    artist: 'Rex Orange County',
    youtubeId: 'OqBuXQLR4Y8',
    artwork: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02ff874602e13e9181c26e5f01',
    album: '',
    duration: 262,
  },
  {
    title: 'Nuts',
    artist: 'RM',
    youtubeId: 'QFsGPm87WnM',
    artwork: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e027093cd0ee6043740f73e54d9',
    album: '',
    duration: 195,
  },
];

const PLAYLIST_URL = 'https://open.spotify.com/playlist/6FaDfcyJMbXzLqcJrpzp9P';

const formatTime = (seconds) => {
  if (!seconds || !isFinite(seconds) || seconds < 0) return '0:00';
  const total = Math.floor(seconds);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
};

const MusicPlayer = () => {
  const playerRef = useRef(null);
  const playerContainerRef = useRef(null);
  const apiReadyRef = useRef(false);
  const playerReadyRef = useRef(false);
  const pendingPlayRef = useRef(false);
  const currentIndexRef = useRef(0);
  const rafRef = useRef(null);
  const isDraggingRef = useRef(false);
  const durationRef = useRef(TRACKS[0].duration || 0);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(TRACKS[0].duration || 0);

  const track = TRACKS[currentIndex];
  const safeDuration = duration > 0 ? duration : 1;
  const progressPercent = duration > 0 ? Math.min((position / duration) * 100, 100) : 0;

  const updatePosition = () => {
    const player = playerRef.current;
    if (!player || typeof player.getCurrentTime !== 'function') return;

    if (!isDraggingRef.current) {
      const currentTime = player.getCurrentTime();
      const playerDuration = player.getDuration();
      const nextDuration = Number.isFinite(playerDuration) && playerDuration > 0
        ? playerDuration
        : durationRef.current;

      if (nextDuration > 0 && nextDuration !== durationRef.current) {
        durationRef.current = nextDuration;
        setDuration(nextDuration);
      }

      if (Number.isFinite(currentTime)) {
        setPosition(Math.max(0, Math.min(currentTime, nextDuration || currentTime)));
      }
    }

    rafRef.current = requestAnimationFrame(updatePosition);
  };

  const startPositionSync = () => {
    if (rafRef.current === null) {
      rafRef.current = requestAnimationFrame(updatePosition);
    }
  };

  const stopPositionSync = () => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  };

  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  useEffect(() => {
    const loadYouTubeAPI = () => {
      if (window.YT?.Player) {
        apiReadyRef.current = true;
        createPlayer();
        return;
      }

      const existingScript = document.querySelector('script[src="https://www.youtube.com/iframe_api"]');
      const previousReady = window.onYouTubeIframeAPIReady;

      window.onYouTubeIframeAPIReady = () => {
        previousReady?.();
        apiReadyRef.current = true;
        createPlayer();
      };

      if (!existingScript) {
        const script = document.createElement('script');
        script.src = 'https://www.youtube.com/iframe_api';
        script.async = true;
        document.body.appendChild(script);
      }
    };

    const createPlayer = () => {
      if (!apiReadyRef.current || playerRef.current || !playerContainerRef.current || !window.YT?.Player) return;

      playerRef.current = new window.YT.Player(playerContainerRef.current, {
        width: '200',
        height: '113',
        videoId: TRACKS[currentIndexRef.current].youtubeId,
        playerVars: {
          controls: 0,
          disablekb: 1,
          fs: 0,
          playsinline: 1,
          rel: 0,
          modestbranding: 1,
          iv_load_policy: 3,
          origin: window.location.origin,
        },
        events: {
          onReady: (event) => {
            playerReadyRef.current = true;
            const playerDuration = event.target.getDuration();
            if (Number.isFinite(playerDuration) && playerDuration > 0) {
              durationRef.current = playerDuration;
              setDuration(playerDuration);
            }

            if (pendingPlayRef.current) {
              pendingPlayRef.current = false;
              event.target.seekTo(0, true);
              event.target.playVideo();
            }
          },
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
              setIsPlaying(true);
              startPositionSync();
            } else if (event.data === window.YT.PlayerState.PAUSED) {
              setIsPlaying(false);
              updatePosition();
              stopPositionSync();
            } else if (event.data === window.YT.PlayerState.ENDED) {
              setIsPlaying(false);
              const playerDuration = event.target.getDuration();
              const finalDuration = Number.isFinite(playerDuration) && playerDuration > 0
                ? playerDuration
                : durationRef.current;
              setPosition(finalDuration);
              stopPositionSync();
            }
          },
        },
      });
    };

    loadYouTubeAPI();

    return () => {
      stopPositionSync();
      if (playerRef.current?.destroy) {
        playerRef.current.destroy();
      }
      playerRef.current = null;
      playerReadyRef.current = false;
    };
  }, []);

  const togglePlay = () => {
    const player = playerRef.current;
    if (!player || !playerReadyRef.current) {
      pendingPlayRef.current = true;
      return;
    }

    if (isPlaying) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  };

  const changeTrack = (index) => {
    if (index === currentIndex) return;

    const nextTrack = TRACKS[index];
    setCurrentIndex(index);
    setPosition(0);
    durationRef.current = nextTrack.duration || 0;
    setDuration(nextTrack.duration || 0);
    isDraggingRef.current = false;

    const player = playerRef.current;
    if (!player || !playerReadyRef.current) {
      pendingPlayRef.current = true;
      return;
    }

    player.loadVideoById({
      videoId: nextTrack.youtubeId,
      startSeconds: 0,
    });
  };

  const nextTrack = () => changeTrack((currentIndex + 1) % TRACKS.length);
  const prevTrack = () => changeTrack((currentIndex - 1 + TRACKS.length) % TRACKS.length);

  const handleSeek = (e) => {
    const player = playerRef.current;
    const value = Number(e.target.value);
    setPosition(value);

    if (player && playerReadyRef.current) {
      // During dragging, don't ask YouTube to seek ahead/buffer on every movement.
      player.seekTo(value, isDraggingRef.current ? false : true);
    }
  };

  const handleSeekStart = () => {
    isDraggingRef.current = true;
  };

  const handleSeekEnd = (e) => {
    const player = playerRef.current;
    const value = Number(e.currentTarget.value);
    isDraggingRef.current = false;
    setPosition(value);

    if (player && playerReadyRef.current) {
      // On release, allow YouTube to seek ahead to the requested position.
      player.seekTo(value, true);
    }
  };

  return (
    <div className={styles.container}>
      <p className={styles.label}>Currently Listening to:</p>

      <div className={styles.playerCard}>
        <div className={styles.trackInfo}>
          <a
            href={`https://music.youtube.com/watch?v=${track.youtubeId}`}
            target="_blank"
            rel="noreferrer"
            className={styles.artLink}
            aria-label={`Open ${track.title} by ${track.artist} on YouTube Music`}
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
            onPointerDown={handleSeekStart}
            onPointerUp={handleSeekEnd}
            onTouchStart={handleSeekStart}
            onTouchEnd={handleSeekEnd}
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

      {/* YouTube player canvas. It is kept in the DOM and off-canvas rather than
          display:none so mobile browsers can continue playback reliably. */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          left: '-9999px',
          top: '0',
          width: '200px',
          height: '113px',
          opacity: 0,
          pointerEvents: 'none',
        }}
      >
        <div ref={playerContainerRef} />
      </div>
    </div>
  );
};

export default MusicPlayer;
