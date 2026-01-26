export const ensureFaviconLinks = () => {
  const rels = ['icon', 'apple-touch-icon'];
  rels.forEach((rel) => {
    let link = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
    if (!link) {
      link = document.createElement('link');
      link.rel = rel;
      document.head.appendChild(link);
    }
  });
};

export const updateFaviconHref = (href: string) => {
  const icons = document.querySelectorAll<HTMLLinkElement>('link[rel="icon"], link[rel="apple-touch-icon"]');
  icons.forEach((link) => {
    link.href = href;
  });
};
