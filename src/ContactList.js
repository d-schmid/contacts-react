import React from 'react';
import SearchField from './SearchField';

class ContactList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      debouncedSearch: '',
      contacts: [
        { id: 1, firstname: 'Daniel', lastname: 'Schmid' },
        { id: 2, firstname: 'Daniel', lastname: 'Brönnimann' }
      ]
    };
  }

  handleSearchChange = (searchString)=>{
    this.setState({debouncedSearch: searchString});
  }

  render() {
    const { contacts, debouncedSearch } = this.state;
    return (
      <div className="Contact-list">
        <SearchField updateSearchString={this.handleSearchChange}/>
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
