import { useEffect } from 'react';

export const useScrollToTop = (behavior: ScrollBehavior = 'smooth') => {
  useEffect(() => {
    // window.scrollTo({
    //   top: 0,
    //   behavior,
    // });
    window.scrollTo(0, 0);
  }, [behavior]);
};
