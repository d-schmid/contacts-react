import React, { useState, useEffect, useMemo } from 'react';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

function SearchField(props) {
  const [searchInput, setSearchInput] = useState('');
  const onSearch$ = useMemo(() => new Subject().pipe(debounceTime(3000)), []);

  let subscription;
  useEffect(() => {
    if (!subscription) {
      subscription = onSearch$.subscribe(debounced => {
        props.updateSearchString(debounced);
      });
    }
    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);

  const onSearch = e => {
    const search = e.target.value;
    setSearchInput(search);
    onSearch$.next(search);
  };

  return (
    <label htmlFor="search">
      Search
      <input id="search" value={searchInput} onChange={onSearch} />
    </label>
  );
}

export default SearchField;
