import React from 'react';
import SearchField from './SearchField';

const API_URL = 'http://localhost:3000';

class ContactList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: []
    };
  }

  componentWillMount() {
    fetch(`${API_URL}/contacts?_page=1&_limit=20`)
      .then(response => response.json())
      .then(responseData => {
        this.setState({ contacts: responseData });
      })
      .catch(() => {
        this.setState({ contacts: [] });
      });
  }

  handleSearchChange = searchString => {
    if (searchString === '') {
      this.setState({ contacts: [] });
      return;
    }
    fetch(`${API_URL}/contacts?displayname_like=${searchString}`)
      .then(response => response.json())
      .then(responseData => {
        this.setState({ contacts: responseData });
      });
  };

  render() {
    const { contacts } = this.state;
    return (
      <div className="Contact-list">
        <SearchField updateSearchString={this.handleSearchChange} />
        <ul>
          {contacts
            .sort(function(a, b) {
              const nameA = a.displayname.toUpperCase();
              const nameB = b.displayname.toUpperCase();
              if (nameA < nameB) {
                return -1;
              }
              if (nameA > nameB) {
                return 1;
              }
              return 0;
            })
            .map(item => {
              return <li key={item.id}>{item.displayname}</li>;
            })}
        </ul>
      </div>
    );
  }
}

export default ContactList;
