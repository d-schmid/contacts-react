import React, {useEffect} from 'react';
import { useDebounce } from '../util/hooks';

function SearchField(props) {
  const {updateSearchString} = props;
  const [searchInput, searchInputDisplay, setSearchInputDisplay] = useDebounce('', 500);
  useEffect(() => updateSearchString(searchInput), [searchInput, updateSearchString])
  const onSearch = e => setSearchInputDisplay(e.target.value);
  return <input id="search" className="input" name="search" placeholder="search" value={searchInputDisplay} onChange={onSearch} />;
}

export default SearchField;
