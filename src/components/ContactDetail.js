import React, { useState, useEffect } from 'react';
import contactsService from '../services/ContactsService';

const ContactDetail = (props) => {
  const id = props.id;
  const [contact, setContact] = useState(null);

  useEffect(() => {
    const subscription = contactsService.subscibeToContact(id, c => setContact(c));
    return () => subscription.unsubscribe();
  }, [id]);

  console.log(contact);
  if (!contact) {
    return null;
  }

  const mail = contact.firstname.toLowerCase() + '@mail.com';

  return (
    <div className="card">
      <div className="card-content">
        <div className="media">
          <div className="media-left">
            <figure className="image is-96x96">
              <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder"/>
            </figure>
          </div>
          <div className="media-content">
            <p className="title is-4">{contact.displayname}</p>
            <p className="subtitle is-6">
              <a href={`mailto:${mail}`}>{mail}</a>
            </p>
          </div>
        </div>
        <div className="content">
          <button className="button is-pulled-right" type="button">
            <span className="icon is-small">
                <i className="fas fa-star"></i>
            </span>
          </button>
          <span className="is-clearfix"/>
        </div>
      </div>
    </div>
  );
};

export default ContactDetail;
