import { BehaviorSubject, from, of } from 'rxjs';
import { map, flatMap, switchMap, distinctUntilChanged } from 'rxjs/operators';

const API_ENDPOINT = 'http://localhost:3333';

function compareContactsDisplayname(a, b) {
  const nameA = a.displayname.toUpperCase();
  const nameB = b.displayname.toUpperCase();
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  return 0;
}

// TODO error handling

class ContactsService {

  apiEndpoint;

  searchString$;

  contacts$;

  constructor(apiEndpoint) {
    this.apiEndpoint = apiEndpoint;
    this.searchString$ = new BehaviorSubject('');
    this.contacts$ = this.searchString$.pipe(
      distinctUntilChanged(),
      switchMap((searchString) => {
        if (searchString) {
          return from(this.fetchFiltered(searchString));
        }
        return from(this.fetchAll());
      }),
      flatMap(response => {
        return response.json();
      }),
      map(contacts => contacts.sort(compareContactsDisplayname))
    );
  }

  fetchContact(id) {
    return fetch(`${this.apiEndpoint}/contacts/${id}`);
  }

  fetchAll() {
    return fetch(`${this.apiEndpoint}/contacts?_page=1&_limit=20`);
  }

  fetchFiltered(query) {
    return fetch(`${this.apiEndpoint}/contacts?displayname_like=${query}`);
  }

  subscribeToContacts(callback) {
    return this.contacts$.subscribe(callback);
  }

  searchContacts(searchString) {
    this.searchString$.next(searchString);
  }

  subscibeToContact(id, callback) {
    if (!id) {
      return of(null).subscribe(callback);
    }

    return from(this.fetchContact(id)).pipe(flatMap(response => response.json())).subscribe(callback);
  }

}


const contactsService = new ContactsService(API_ENDPOINT);

export default contactsService;


