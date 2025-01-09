import logo from '../logo.svg';
import { useEffect } from 'react';

export default function HomePage(){
  useEffect(() => {
    window.location.href = 'https://www.newsletterdepo.com'; // Replace with the actual URL you want to redirect to
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        {/* <p>TW16aw3h21vcjptHJi4YQLqKXV8vFhjpWB</p> */}

        </a>
      </header>
    </div>
  )
}