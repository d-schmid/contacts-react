import React from 'react';
import { from } from 'rxjs';
import { flatMap } from 'rxjs/operators';
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
    const fetch$ = from(fetch(`${API_URL}/contacts?_page=1&_limit=20`)).pipe(flatMap(response => response.json()));

    fetch$.subscribe({
      next: data => {
        this.setState({ contacts: data });
      },
      error: () => {
        this.setState({ contacts: [] });
      }
    });
  }

  handleSearchChange = searchString => {
    if (searchString === '') {
      this.setState({ contacts: [] });
      return;
    }

    const fetch$ = from(fetch(`${API_URL}/contacts?displayname_like=${searchString}`)).pipe(
      flatMap(response => response.json())
    );
    fetch$.subscribe({
      next: data => {
        this.setState({ contacts: data });
      },
      error: () => {
        this.setState({ contacts: [] });
      }
    });
  };

  sortName = (a, b) => {
    const nameA = a.displayname.toUpperCase();
    const nameB = b.displayname.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  };

  render() {
    const { contacts } = this.state;

    const contactElements = contacts.sort(this.sortName).map(item => {
      return (
        <a key={item.id} className="panel-block" href={'/contact/' + item.id}>
          <span className="panel-icon">
              <i className="fas fa-user" aria-hidden="true"></i>
          </span>
          {item.displayname}
        </a>
      );
    });

    return (
      <nav className="panel">
        <p className="panel-heading">
          Contacts
        </p>
        <div className="panel-block">
          <p className="control has-icons-left">
            <SearchField updateSearchString={this.handleSearchChange}/>
            <span className="icon is-left"><i className="fas fa-search" aria-hidden="true"/></span>
          </p>
        </div>
        {contactElements}
        <div className="panel-block">
          <span>{contacts.length} Kontakte </span>
        </div>
      </nav>
    );
  }
}

export default ContactList;
