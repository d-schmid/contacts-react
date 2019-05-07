import React, {useEffect} from 'react';
import { useDebounce } from './hooks';

function SearchField(props) {
  const {updateSearchString} = props;
  const [searchInput, searchInputDisplay, setSearchInputDisplay] = useDebounce('');
  useEffect(() => updateSearchString(searchInput), [searchInput, updateSearchString])
  const onSearch = e => setSearchInputDisplay(e.target.value);
  return (
    <div>
      <input id="search" name="search" placeholder="search" value={searchInputDisplay} onChange={onSearch} />
    </div>
  );
}

export default SearchField;
