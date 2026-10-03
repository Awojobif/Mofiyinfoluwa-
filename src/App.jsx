import { useState, useEffect, useLayoutEffect } from 'react';
import Home from './pages/Home/Home';
import MailMint from './pages/MailMint/MailMint';
import Poise from './pages/Poise/Poise';
import CustomCursor from './components/CustomCursor/CustomCursor';

const getRoute = () => {
  const hash = window.location.hash;
  if (hash.startsWith('#/projects/mailmint')) return 'mailmint';
  if (hash.startsWith('#/projects/poise')) return 'poise';
  return 'home';
};

function App() {
  const [route, setRoute] = useState(getRoute());

  useEffect(() => {
    const onHashChange = () => setRoute(getRoute());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // Reset scroll position on every route change, so a case study page
  // always opens at its hero instead of inheriting the previous page's
  // scroll offset.
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [route]);

  return (
    <>
      <CustomCursor />
      {route === 'mailmint' ? <MailMint /> : route === 'poise' ? <Poise /> : <Home />}
    </>
  );
}

export default App;
