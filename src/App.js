import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/js/all';
import React from 'react';
import './App.css';
import ContactList from './ContactList';
import ContactDetail from './ContactDetail';


function App() {
  return (
    <section className="section">
      <div className="container">
        <div className="columns">
          <div className="column is-4">
            <ContactList/>
          </div>
          <div className="column">
            <ContactDetail/>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
