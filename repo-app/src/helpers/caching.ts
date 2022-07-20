export const getCachedResults = () => {
  const savedQuery = localStorage.getItem("searchQuery");
  const savedData = localStorage.getItem(`repo-data-${savedQuery}`) as string;
  return { savedData: JSON.parse(savedData) };
};
