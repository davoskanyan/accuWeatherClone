import { useEffect, useMemo, useState } from 'react';
import { debounce } from 'lodash';

export function useDebouncedValue(value) {
  const [newValue, setNewValue] = useState(value);
  const debouncedSet = useMemo(() => debounce(setNewValue, 500), []);

  useEffect(() => {
    debouncedSet(value);

    return () => {
      debouncedSet.cancel();
    };
  }, [debouncedSet, value]);

  return newValue;
}
