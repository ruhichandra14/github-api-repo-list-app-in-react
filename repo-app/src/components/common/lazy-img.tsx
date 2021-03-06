import { useEffect, useRef } from "react";
import { LazyImgProps } from "../../typedef/typedef";

const LazyImage = ({ observer, src, alt }: LazyImgProps) => {
  const elem = useRef(null);
  
  useEffect(() => {
    const current = elem?.current;

    if (observer !== null) {
      observer.observe(current);
    }

    return () => {
      if (observer && current) {
        observer.unobserve(current);
      }
    };
  }, [observer]);
  return <div className="img-wrapper"><img ref={elem} data-src={src} alt={alt} className="avatar-image"/></div>
};

export default LazyImage;
