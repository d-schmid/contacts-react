import { Subject } from 'rxjs/index';
import { debounceTime } from 'rxjs/operators/index';
import { useState, useEffect, useMemo } from 'react';

export function useDebounce(initialState, timeout = 500) {

  const [displayValue, setDisplayValue] = useState(initialState);
  const [value, setValue] = useState(initialState);

  const values$ = useMemo(() => new Subject().pipe(debounceTime(timeout)), [timeout]);
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
