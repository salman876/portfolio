export const setLocalStorageItem = (key: string, item: unknown) => {
  try {
    if (typeof item === 'object') {
      window.localStorage.setItem(key, JSON.stringify(item));
    } else {
      window.localStorage.setItem(key, item as string);
    }
  } catch (e) {}
};

export const getLocalStorageItem = (key: string): string | null => {
  try {
    return window.localStorage.getItem(key);
  } catch (e) {
    return null;
  }
};

export const clearLocalStorage = () => {
  try {
    window.localStorage.clear();
  } catch (e) {}
};
