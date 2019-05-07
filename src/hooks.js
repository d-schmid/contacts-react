import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { useState, useEffect, useMemo } from 'react';

export function useDebounce(initialState) {

  const [displayValue, setDisplayValue] = useState(initialState);
  const [value, setValue] = useState(initialState);

  const values$ = useMemo(() => new Subject().pipe(debounceTime(500)), []);
  useEffect(() => {
    const subscription = values$.subscribe(debouncedValue => {
      setValue(debouncedValue)
    });
    return () => subscription && subscription.unsubscribe(); 
  }, [initialState, values$])

  const nextDisplayValue = (newDisplayValue) => {
    setDisplayValue(newDisplayValue);
    values$.next(newDisplayValue)
  }

  return [value, displayValue, nextDisplayValue];
}
