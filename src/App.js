import './custom.css';
import {BrowserRouter as Router ,Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import OnboardingPage from './pages/OnboardingPage'
import UpdateInfoPage from './pages/UpdateInfoPage';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    if (window.location.pathname === '/') {
      window.location.href = 'https://www.newsletterdepo.com'; // Replace with the actual URL you want to redirect to
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* <Route path="/" Component={HomePage} /> */}
        <Route path="/onboarding" Component={OnboardingPage} />
        <Route path="/update_info" Component={UpdateInfoPage} />
      </Routes>
    </Router>
  );
}

export default App;