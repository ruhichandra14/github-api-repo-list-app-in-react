import { useState, SetStateAction } from "react";
import RepoList from "./repo-list";
import Header from "./common/header";
import { RepoData } from "../typedef/typedef";
import Search from "./search";
import { useSearchResults } from "../hooks/use-search-results";

const SearchReposContainer = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { isLoading, repoData, searchAPIRespTime } =
    useSearchResults(searchQuery);
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
          <RepoList
            repoList={repoData as unknown as RepoData}
            isLoading={isLoading}
          />
        )}
      </section>
    </>
  );
};
export default SearchReposContainer;
