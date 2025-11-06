import { useEffect } from 'react';

function usePageTitle(title) {
  useEffect(() => {
    document.title = title;
  }, [title]); // `title` değiştiğinde yeniden çalışır
}

export default usePageTitle;
