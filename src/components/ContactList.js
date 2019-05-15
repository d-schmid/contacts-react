import React, { useEffect, useState } from 'react';
import SearchField from './SearchField';
import contactsService from '../services/ContactsService';
import { Link } from '@reach/router';

function ContactList() {
  // state that holds contacts returned by contactsService
  const [contacts, setContacts] = useState([]);

  // Subscribe to contacts on component mount and unsubscribe on unmount
  useEffect(() => {
    const subscription = contactsService.subscribeToContacts(result => setContacts(result));
    return () => subscription.unsubscribe();
  }, []);

  return (
    <nav className="panel">
      <p className="panel-heading">
        Contacts
      </p>
      <div className="panel-block">
        <p className="control has-icons-left">
          <SearchField updateSearchString={searchString => contactsService.searchContacts(searchString)}/>
          <span className="icon is-left"><i className="fas fa-search" aria-hidden="true"/></span>
        </p>
      </div>
      {contacts.map(c => {
        return (
          <Link key={c.id} className="panel-block" to={`/contacts/${c.id}`}>
              <span className="panel-icon">
                  <i className="fas fa-user" aria-hidden="true"/>
              </span>
            {c.displayname}
          </Link>
        );
      })}
      <div className="panel-block">
        <span>{contacts.length} Kontakte</span>
      </div>
    </nav>
  );
}

// export default ContactList;
export default ContactList;
