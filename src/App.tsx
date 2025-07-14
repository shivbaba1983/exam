import logo from './logo.svg';
import './App.css';
//import FirstAPP from './myapp';
import CMSRoute from './CMSRoute'
import { useEffect } from 'react';


function App() {

  //to disable copy paste
  // useEffect(() => {
  //   const handleContextMenu = (e: MouseEvent) => {
  //     e.preventDefault();
  //   };
  //   document.addEventListener('contextmenu', handleContextMenu);
  //   return () => {
  //     document.removeEventListener('contextmenu', handleContextMenu);
  //   };
  // }, []);

  // useEffect(() => {
  //   const blockKeys = (e: KeyboardEvent) => {
  //     if (
  //       e.key === 'F12' ||
  //       (e.ctrlKey && e.shiftKey && e.key === 'I') ||
  //       (e.ctrlKey && e.key === 'U') ||
  //       (e.ctrlKey && e.key === 'C')
  //     ) {
  //       e.preventDefault();
  //     }
  //   };
  //   document.addEventListener('keydown', blockKeys);
  //   return () => {
  //     document.removeEventListener('keydown', blockKeys);
  //   };
  // }, []);
  return (
    <div className="App">
      {/* <header className="App-header">
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
        </a>
      </header> */}
      <CMSRoute />
      {/* <FirstAPP/> */}
    </div>
  );
}

export default App;
