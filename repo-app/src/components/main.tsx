import React, { useState, useEffect } from "react";
import RepoList from "./repo-list";

//const { performance } = require('perf_hooks');

const Main = () => {
  const [repoName, setRepoName] = useState("");
  const [repoData, setRepoData] = useState([]);
  const [searchAPIRespTime, setSearchAPIRespTime] = useState(0);
  console.log("performance.navigation.type", performance.navigation.type);

  useEffect(() => {
    let searchDebouncer = setTimeout(() => {
      if (repoName) {
        fetchRepoData();
        setSearchAPIRespTime(performance.now())
      }
    }, 1500);

    return () => clearTimeout(searchDebouncer);
  }, [repoName]);

  const fetchRepoData = async () => {
    let urlWithQuery = `https://api.github.com/search/repositories?q=${repoName}`;
  

    const response = await fetch(urlWithQuery);
    const jsonData = await response.json();
    if (jsonData && jsonData.message !== "Not Found") {
      setRepoData(jsonData);
      console.log(jsonData);
      if(repoData?.length){
        setSearchAPIRespTime(performance.now() - searchAPIRespTime)
      }
      
    } else if (repoName !== "") {
      console.log(`Repo data isn't found`);
    }
  };

  const searchResults = searchAPIRespTime ?
    <header className="search-results-heading">Search results about repo results provided in {(searchAPIRespTime / 1000).toFixed(2)} seconds </header>
    : null;

  return (
    <div>
      <div className="search-repos">
        <label>Search for repos: </label>
        <input value={repoName} type="search" onChange={(e) => setRepoName(e.target.value)} />
      </div>

      {
        repoData && <>
          {searchResults}
          <RepoList repoData={repoData} />
        </>
      }
    </div>
  );
};
export default Main;
