export const createObserver = (inViewCallback: IntersectionObserverCallback, newOptions = {}) => {
  return new IntersectionObserver(
    inViewCallback,
    Object.assign(
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.3,
      },
      newOptions
    )
  );
};

export const onContentInView = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
  entries.forEach((entry: IntersectionObserverEntry) => {
    if (entry.isIntersecting) {
      const element = entry.target;
      const imageSrc = element.getAttribute('data-src') as string;
      element.removeAttribute("data-src");
      element.setAttribute("src", imageSrc);
      observer.unobserve(element);
    }
  });
};
