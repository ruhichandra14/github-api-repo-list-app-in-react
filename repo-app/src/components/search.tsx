import {
  FIND_REPO,
  SEARCH_REPOS,
  SEARCH_TIME,
} from "../constants/constants";
import { SearchProps } from "../typedef/typedef";

// This component is for searching of repos
const Search = ({
  inputVal,
  onInputChangeHandler,
  searchAPIRespTime,
  showTime
}: SearchProps) => {

  const searchTimeText =`${SEARCH_TIME} ${(searchAPIRespTime / 1000).toFixed(2)} s`;
  const searchResults = searchAPIRespTime && showTime ? (
    <div className="search-results-time info">{searchTimeText}</div>
  ) : null;

  return (
    <>
      <div className="search-container ">
        <form className="search-input" onSubmit={(e) => e.preventDefault()}>
          <label>{SEARCH_REPOS} </label>
          <input
            value={inputVal}
            type="search"
            onChange={(e) => onInputChangeHandler(e)}
            placeholder={FIND_REPO}
          />
        </form>
        {searchResults}
      </div>
    </>
  );
};

export default Search;
