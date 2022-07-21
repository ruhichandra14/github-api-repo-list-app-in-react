export const getCachedResults = () => {
  const savedQuery = localStorage.getItem("searchQuery");
  let savedData = localStorage.getItem(`repo-data-${savedQuery}`) as string;
  return { savedData: savedData ? JSON.parse(savedData) : null };
};
