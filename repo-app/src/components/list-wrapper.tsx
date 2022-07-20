import { useState, useEffect, SetStateAction } from "react";
import RepoList from "./repo-list";
import Header from "./common/header";
import { REPO_URL } from "../constants/constants";
import { fetchCall } from "../helpers/fetchCall";
import { RepoData } from "../typedef/typedef";
import Search from "./search";

const SearchReposContainer = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [repoData, setRepoData] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchAPIRespTime, setSearchAPIRespTime] = useState<number>(0);

  useEffect(() => {
    const savedQuery = localStorage.getItem("searchQuery");
    const savedData = localStorage.getItem(`repo-data-${savedQuery}`);
    if (savedQuery && savedData) {
      setRepoData(JSON.parse(savedData as string));
    }
  }, []);

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
      localStorage.setItem(`searchQuery`, searchQuery);
      localStorage.setItem(
        `repo-data-${searchQuery}`,
        JSON.stringify(jsonData)
      );
      if (repoData?.length) {
        setSearchAPIRespTime(performance.now() - searchAPIRespTime);
      }
    }
    setIsLoading(false);
  };

  const searchHandler = (e: { target: { value: SetStateAction<string> } }) =>
    setSearchQuery(e.target.value);

  return (
    <>
      <Header title="find github repos" />
      <section className="main-content">
        <Search
          inputVal={searchQuery}
          onInputChangeHandler={(e) => searchHandler(e)}
          searchAPIRespTime={searchAPIRespTime}
        />

        {repoData && (
          <>
            <RepoList
              repoList={repoData as unknown as RepoData}
              isLoading={isLoading}
            />
          </>
        )}
      </section>
    </>
  );
};
export default SearchReposContainer;
