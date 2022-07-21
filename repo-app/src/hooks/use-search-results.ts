import { useEffect, useState } from "react";
import { REPO_URL } from "../constants/constants";
import { getCachedResults } from "../helpers/caching";
import { fetchCall } from "../helpers/fetchCall";
import { RepoData } from "../typedef/typedef";

export const useSearchResults = (searchQuery: string) => {
  const [repoData, setRepoData] = useState<RepoData>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchAPIRespTime, setSearchAPIRespTime] = useState<number>(0);
  const [showTime, setShowTime] = useState<boolean>(true);

  const fetchRepoData = async () => {
    const jsonData = await fetchCall({ url: REPO_URL, searchQuery });
    if (jsonData?.message !== "Not Found") {
      setRepoData(jsonData);
      setSearchAPIRespTime(performance.now() - searchAPIRespTime);
      setShowTime(true);
      localStorage.setItem(`searchQuery`, searchQuery);
      localStorage.setItem(
        `repo-data-${searchQuery}`,
        JSON.stringify(jsonData)
      );
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const { savedData } = getCachedResults();
    if (savedData) {
      setRepoData(savedData);
    }
  }, []);

  useEffect(() => {
    if (searchQuery) {
      setIsLoading(true);
    }

    let searchDebouncer: NodeJS.Timeout;
    // on search, first check/retrieve if data is stored in cache, else do the fetch call
    const { savedData } = getCachedResults();
    const savedQuery = localStorage.getItem("searchQuery");
    if (searchQuery === savedQuery && savedData) {
      setRepoData(savedData);
      setIsLoading(false);
    } else {
      searchDebouncer = setTimeout(() => {
        if (searchQuery) {
          fetchRepoData();
        }
      }, 1500);
      setSearchAPIRespTime(performance.now());
    }
    return () => { 
      setShowTime(false);
      clearTimeout(searchDebouncer);
    }
  }, [searchQuery]);

  return {
    isLoading,
    repoData,
    showTime,
    searchAPIRespTime,
  };
};
