import React, { useState, useEffect, useMemo } from 'react';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

function SearchField(props) {
  const [searchInput, setSearchInput] = useState('');
  const onSearch$ = useMemo(() => new Subject().pipe(debounceTime(500)), []);


  useEffect(() => {
      const subscription = onSearch$.subscribe(debounced => {
        props.updateSearchString(debounced);
      });
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
    <div>
      <input id="search" name='search' placeholder='search' value={searchInput} onChange={onSearch} />
    </div>

  );
}

export default SearchField;
