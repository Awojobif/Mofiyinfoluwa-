import { useState, useEffect, useLayoutEffect } from 'react';
import Home from './pages/Home/Home';
import MailMint from './pages/MailMint/MailMint';
import Poise from './pages/Poise/Poise';
import CustomCursor from './components/CustomCursor/CustomCursor';

export const getRoute = (overrideRoute) => {
  if (overrideRoute) {
    if (overrideRoute.includes('/projects/mailmint')) return 'mailmint';
    if (overrideRoute.includes('/projects/poise')) return 'poise';
    return 'home';
  }

  if (typeof window === 'undefined') return 'home';

  const pathname = window.location.pathname || '';
  const hash = window.location.hash || '';

  if (pathname.startsWith('/projects/mailmint') || hash.startsWith('#/projects/mailmint')) return 'mailmint';
  if (pathname.startsWith('/projects/poise') || hash.startsWith('#/projects/poise')) return 'poise';
  return 'home';
};

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

function App({ initialRoute }) {
  const [route, setRoute] = useState(() => getRoute(initialRoute));

  useEffect(() => {
    const onLocationChange = () => setRoute(getRoute());
    window.addEventListener('hashchange', onLocationChange);
    window.addEventListener('popstate', onLocationChange);

    const handleLinkClick = (e) => {
      const anchor = e.target.closest('a');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href) return;

      // Ignore external links, downloads, new tabs
      if (anchor.target === '_blank' || href.startsWith('http') || href.startsWith('mailto:') || href.endsWith('.pdf')) {
        return;
      }

      // Ignore pure on-page anchor jumps like #work or #about on the same page
      if (href.startsWith('#') && !href.startsWith('#/')) {
        return;
      }

      // Handle homepage anchor jumps from other pages like /#work
      if (href.startsWith('/#')) {
        if (window.location.pathname !== '/') {
          e.preventDefault();
          window.history.pushState({}, '', href);
          onLocationChange();
          const targetId = href.replace('/#', '');
          const target = document.getElementById(targetId);
          if (target) target.scrollIntoView({ behavior: 'smooth' });
        }
        return;
      }

      // Handle path navigation
      if (href.startsWith('/')) {
        e.preventDefault();
        if (window.location.pathname !== href) {
          window.history.pushState({}, '', href);
          onLocationChange();
        }
      }
    };

    document.addEventListener('click', handleLinkClick);

    return () => {
      window.removeEventListener('hashchange', onLocationChange);
      window.removeEventListener('popstate', onLocationChange);
      document.removeEventListener('click', handleLinkClick);
    };
  }, []);

  // Reset scroll position on every route change, so a case study page
  // always opens at its hero instead of inheriting the previous page's
  // scroll offset.
  useIsomorphicLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }, [route]);

  return (
    <>
      <CustomCursor />
      {route === 'mailmint' ? <MailMint /> : route === 'poise' ? <Poise /> : <Home />}
    </>
  );
}

export default App;
