import React from 'react';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

const onSearch$ = new Subject().pipe(
  debounceTime(300)
);

class ContactList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
      debouncedSearch: '',
      contacts: [
        { id: 1, firstname: 'Daniel', lastname: 'Schmid' },
        { id: 2, firstname: 'Daniel', lastname: 'Brönnimann' }
      ]
    };
  }

  componentDidMount(){
    this.subscription = onSearch$.subscribe(
      debounced => this.setState({ debouncedSearch: debounced })
    );
  }

  componentWillUnmount() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onSearch = (e) => {
    const search = e.target.value;
    this.setState({ searchInput: search });
    onSearch$.next(search);
  };

  render() {
    const { contacts, searchInput, debouncedSearch } = this.state;
    return (
      <div className="Contact-list">
        <label htmlFor="search">
          Search
          <input id="search" value={searchInput} onChange={this.onSearch} />
        </label>

        <ul>
          {contacts
            .filter(i => {
              const name = (`${i.firstname} ${i.lastname}` || '').toLowerCase();
              const searchString = (debouncedSearch || '').toLowerCase();
              return name.startsWith(searchString);
            })
            .map(item => {
              return (
                <li key={item.id}>
                  {item.firstname} {item.lastname}
                </li>
              );
            })}
        </ul>
      </div>
    );
  }
}

export default ContactList;
