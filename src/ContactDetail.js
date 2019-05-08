import React from 'react';

const ContactDetail = (props) => {
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
            <p className="title is-4">John Smith</p>
            <p className="subtitle is-6">
              <a href="mailto:test@test.com">john.smith@mail.com</a>
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
