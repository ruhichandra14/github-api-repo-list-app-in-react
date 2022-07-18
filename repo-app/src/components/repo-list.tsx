import { useEffect } from "react";

const RepoList = ({
    repoData
}: any) => {
   
    const repoList = repoData.items;
    if(!repoList?.length){
        return <div>No repos found!</div>
    }

    console.log("repoList-------- ", repoList);
    return (
        <>
        <p>{repoList && "aa" + repoList[0].id}</p>
        <ul className="repo-list-container">
     
            {repoList.map((repo: any) => 
                <li className="repo-list-item">
                <div className="repo-card">
                        <img className="avatar-image" src={repo?.owner.avatar_url} alt="avatar"/>
                        <div className="repo-details">
                            <div className="repo-name">Repo: {repo?.name}</div>
                            <div className="repo-about">About: {repo?.description}</div>
                        </div>
                </div>
                </li>
            )}
        </ul>
        </>
    );
}
  
export default RepoList;