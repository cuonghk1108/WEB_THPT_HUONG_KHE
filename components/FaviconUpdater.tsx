import { useEffect } from 'react';
import { useData } from '../context/DataContext';

const ensureLink = (rel: string) => {
  let link = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!link) {
    link = document.createElement('link');
    link.rel = rel;
    document.head.appendChild(link);
  }
  return link;
};

const updateFavicon = (href: string) => {
  const iconLink = ensureLink('icon');
  iconLink.type = 'image/png';
  iconLink.href = href;

  const appleLink = ensureLink('apple-touch-icon');
  appleLink.href = href;
};

export const FaviconUpdater = () => {
  const { globalImages } = useData();

  useEffect(() => {
    if (globalImages?.logo) {
      updateFavicon(globalImages.logo);
    }
  }, [globalImages?.logo]);

  return null;
};

export default FaviconUpdater;
