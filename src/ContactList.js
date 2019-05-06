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
    return (
      <div className="Contact-list">
        <SearchField updateSearchString={this.handleSearchChange} />
        <ul>
          {contacts.sort(this.sortName).map(item => {
            return <li key={item.id}>{item.displayname}</li>;
          })}
        </ul>
      </div>
    );
  }
}

export default ContactList;
