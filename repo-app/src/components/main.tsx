import React, { useState, useEffect } from "react";
import RepoList from "./repo-list";

const Main = () => {
  const [repoName, setRepoName] = useState("");
  const [repoData, setRepoData] = useState([]);

  useEffect(() => {
    let searchDebouncer = setTimeout(() => {
      if (repoName) {
        fetchRepoData();
      }
    }, 1500);

    return () => clearTimeout(searchDebouncer);
  }, [repoName]);

  const fetchRepoData = async () => {
    //let url = `https://api.github.com/search/repositories?q=tetris+language:assembly&sort=stars&order=desc`
    let urlWithQuery = `https://api.github.com/search/repositories?q=${repoName}`;
    //let gitHubUrl = `https://api.github.com/users/google/repos`;

    const response = await fetch(urlWithQuery);
    const jsonData = await response.json();
    if (jsonData && jsonData.message !== "Not Found") {
      setRepoData(jsonData);
      console.log(jsonData);
    } else if (repoName !== "") {
      console.log(`Repo data isn't found`);
    }
  };

  return (
    <div>
      <div className="search-repos">
      <label>Search for repos: </label>
      <input value={repoName} type="search" onChange={(e) => setRepoName(e.target.value)} />
      </div>
      
      {repoData && <RepoList repoData={repoData} />}
    </div>
  );
};
export default Main;
