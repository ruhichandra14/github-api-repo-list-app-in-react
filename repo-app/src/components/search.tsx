import { FIND_REPO, SEARCH_REPOS } from "../constants/constants"
import { SearchProps } from "../typedef/typedef";

const Search =  ({
    inputVal,
    onInputChangeHandler,
    searchResults
}: SearchProps) => {
    return (
        <>
        <div className="search-container ">
        <div className="search-input">
          <label>{SEARCH_REPOS} </label>
          <input
            value={inputVal}
            type="text"
            onChange={(e) => onInputChangeHandler(e)}
            placeholder={FIND_REPO}
          />
        </div>
        {searchResults}
      </div>
      </>
    )
}

export default Search;