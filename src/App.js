import React from 'react';
import logo from './logo.svg';
import './App.css';
import ContactList from './ContactList';

function App() {
  return (
    <div className="App">
      <header className="App-header">Learn React
        <img src={logo} className="App-logo" alt="logo" />
      </header>

      <ContactList />
    </div>
  );
}

export default App;
