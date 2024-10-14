import { useEffect } from 'react';

export const useChangePageTitle = (title: string) => {
  useEffect(() => {
    document.title = `Portfolio ${title ? `· ${title}` : ''}`;
  }, [title]);
};
