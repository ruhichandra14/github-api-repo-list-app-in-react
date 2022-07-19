import { useEffect, useRef, useState } from "react";
import LazyImage from "./lazy-img";
import { BrowserRouter, Route, Link } from "react-router-dom";

function createObserver(inViewCallback: any, newOptions = {}) {
    const defaultOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.3,
    }
    return new IntersectionObserver(inViewCallback, Object.assign(defaultOptions, newOptions));
  }

function onImageInView(entries: any, observer: any) {
    entries.forEach((entry: any) => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const imageSrc = element.getAttribute('data-src');
        
        element.removeAttribute('data-src');
        element.setAttribute('src', imageSrc);
        
        observer.unobserve(element);
      } 
    });
  }

  
const RepoList = ({
    repoData
}: any) => {
    const containerRef = useRef(null);
    const [imageObserver, setImageObserver] = useState(null);
  
    useEffect(() => {
      const imageObserver = createObserver(onImageInView); 
      // @ts-ignore
      setImageObserver(imageObserver);
      
      return () => {
        imageObserver.disconnect();
      }
    }, []);

    const repoList = repoData.items;
    if(!repoList?.length){
        return <div>No repos found!</div>
    }

    //console.log("repoList-------- ", repoList, showImage);
    return (
        <>
        <section>
           
        <ul className="repo-list-container">
     
            {repoList?.map((repo: any) => 
                <li className="repo-list-item" key={repo.id}>
               <Link to={{pathname: `/repoDetails/${repo?.id}`}} state={{repo: repo}}> 
                <div className="repo-card">
                       {<LazyImage key={repo?.id} observer={imageObserver} src={repo?.owner.avatar_url}  alt="avatar"/>}
                        <div className="repo-details">
                            <div className="repo-name">Repo: {repo?.name}</div>
                            <div className="repo-about">About: {repo?.description}</div>
                        </div>
                </div>
                </Link>
                </li>
            )}
        </ul>
        <p ref={containerRef}> ** list ends **  </p>
        </section>
        </>
    );
}
  
export default RepoList;