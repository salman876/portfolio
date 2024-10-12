import { Dispatch, FC, SetStateAction, createContext, useContext, useEffect, useState } from 'react';

import { Asset } from 'types/asset';

import { getAssetsFromStorage, setAssetsToLocalStorage } from 'utils/assetStorage';

const initialValue = {} as [Asset[], Dispatch<SetStateAction<Asset[]>>];

const AssetsContext = createContext<[Asset[], Dispatch<SetStateAction<Asset[]>>]>(initialValue);

export const AssetsProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [assets, setAssets] = useState<Asset[]>(getAssetsFromStorage());

  useEffect(() => {
    setAssetsToLocalStorage(assets);
  }, [assets]);

  return <AssetsContext.Provider value={[assets, setAssets]}>{children}</AssetsContext.Provider>;
};

export function useAssetsContext(): [Asset[], Dispatch<SetStateAction<Asset[]>>] {
  return useContext(AssetsContext);
}
