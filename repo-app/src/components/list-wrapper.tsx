import { useState, useEffect, SetStateAction } from "react";
import RepoList from "./repo-list";
import Header from "./common/header";
import {
  FIND_REPO,
  REPO_URL,
  SEARCH_REPOS,
  SEARCH_TIME,
} from "../constants/constants";
import { fetchCall } from "../helpers/fetchCall";
import { RepoData } from "../typedef/typedef";
import Search from "./search";

const SearchReposContainer = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [repoData, setRepoData] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchAPIRespTime, setSearchAPIRespTime] = useState<number>(0);

  useEffect(() => {
    if (searchQuery) {
      setIsLoading(true);
    }
    let searchDebouncer = setTimeout(() => {
      if (searchQuery) {
        fetchRepoData();
        setSearchAPIRespTime(performance.now());
      }
    }, 1500);

    return () => clearTimeout(searchDebouncer);
  }, [searchQuery]);

  const fetchRepoData = async () => {
    const jsonData = await fetchCall({ url: REPO_URL, searchQuery });
    if (jsonData?.message !== "Not Found") {
      setRepoData(jsonData);
      if (repoData?.length) {
        setSearchAPIRespTime(performance.now() - searchAPIRespTime);
      }
    }
    setIsLoading(false);
  };

  const searchResults = searchAPIRespTime ? (
    <div className="search-results-time info">
      {SEARCH_TIME} {(searchAPIRespTime / 1000).toFixed(2)} s{" "}
    </div>
  ) : null;

  const searchHandler = (e: { target: { value: SetStateAction<string>; }; }) => setSearchQuery(e.target.value)

  return (
    <>
      <Header title="find github repos" />
      <section className="main-content">  
      <Search inputVal={searchQuery} onInputChangeHandler={(e) => searchHandler(e)} searchResults={searchResults}/>
 
        {repoData && (
          <>
            <RepoList repoList={repoData as unknown as RepoData} isLoading={isLoading} />
          </>
        )}
      </section>
    </>
  );
};
export default SearchReposContainer;
