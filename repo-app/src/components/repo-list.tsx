import { useEffect } from "react";

const RepoList = ({
    repoData
}: any) => {
   
    const repoList = repoData.items;
    useEffect(() => {
        console.log("inside use--- ", repoList);
      }, [repoList])
  
    if(!repoList?.length){
        return <div>No repos found!</div>
    }


    console.log("repoList-------- ", repoList);
    return (
        <ul className="repo-list-container">
            
            {/* {repoData.avatar_url ? (<div className="dataitem">
               <img src={repoData.avatar_url} 
               alt="avatar" /></div>) : (<div></div>)}
            {repoData.login ? (<div className="dataitem">Login: 
            {repoData.login}</div>) : (<div></div>)}
            {repoData.name ? (<div className="dataitem">
            Name : {repoData.name}</div>) : (<div></div>)}
            {repoData.blog ? (<div className="dataitem">
            Blog: {repoData.blog}</div>) : (<div></div>)} */}
           
            {repoList?.map((repo: any) => {
                <li className="repo-list-item">
                <div className="repo-card">
                    <div>
                        <img src={repo?.owner.avatar_url} alt="avatar"/>
                        <div className="repo-details">
                            <span className="repo-name">{repo?.name}</span>
                            <span className="repo-name">{repo?.description}</span>
                        </div>
                    </div>
                </div>
                </li>
            })}
        </ul>
    );
}
  
export default RepoList;