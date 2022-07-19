import React, { useEffect, useRef } from 'react';

const LazyImage = ({
    observer,
    src,
    alt,
}: any) => {
    const imageEl = useRef(null);

    useEffect(() => {
        const { current } = imageEl;

        if (observer !== null) {
            observer.observe(current);
        }

        return () => {
            if(observer){
                observer.unobserve(current);
            }
            
        }
    }, [observer]);

    return (
        <img
            ref={imageEl}
            data-src={src}
            alt={alt}
            className="avatar-image" 
        />
    )
}
export default LazyImage;