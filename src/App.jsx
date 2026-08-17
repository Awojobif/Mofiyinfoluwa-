import { useState, useEffect } from 'react';
import Home from './pages/Home/Home';
import MailMint from './pages/MailMint/MailMint';
import CustomCursor from './components/CustomCursor/CustomCursor';

const getRoute = () => {
  const hash = window.location.hash;
  if (hash.startsWith('#/projects/mailmint')) return 'mailmint';
  return 'home';
};

function App() {
  const [route, setRoute] = useState(getRoute());

  useEffect(() => {
    const onHashChange = () => setRoute(getRoute());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return (
    <>
      <CustomCursor />
      {route === 'mailmint' ? <MailMint /> : <Home />}
    </>
  );
}

export default App;
