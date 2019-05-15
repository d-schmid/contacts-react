import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/js/all';
import React from 'react';
import './App.css';
import ContactList from './components/ContactList';
import ContactDetail from './components/ContactDetail';
import { Router } from '@reach/router';


function App() {
  return (
    <section className="section">
      <div className="container">
        <div className="columns">
          <div className="column is-4">
            <ContactList/>
          </div>
          <div className="column">
            <Router>
              <ContactDetail path="contacts/:id"/>
            </Router>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
