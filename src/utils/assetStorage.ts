import { Asset } from 'types/asset';

import { getLocalStorageItem, setLocalStorageItem } from './storage';

const ASSSET_LOCAL_STORAGE_KEY = 'assets';

export const getAssetsFromStorage = () => {
  const storedAssets = JSON.parse(getLocalStorageItem(ASSSET_LOCAL_STORAGE_KEY) || '[]') as Asset[];
  return storedAssets;
};

export const setAssetsToLocalStorage = (assets: Asset[]) => {
  setLocalStorageItem(ASSSET_LOCAL_STORAGE_KEY, JSON.stringify(assets));
};
