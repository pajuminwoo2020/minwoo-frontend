import React from 'react';
import storage from 'libs/storage';

export const useStateWithLocalStorage = (localStorageKey: string) => {
  const [value, setValue] = React.useState(storage.getItem(localStorageKey) || null);

  React.useEffect(() => {
    storage.setItem(localStorageKey, value);
  }, [localStorageKey, value]);

  return [value, setValue];
};
