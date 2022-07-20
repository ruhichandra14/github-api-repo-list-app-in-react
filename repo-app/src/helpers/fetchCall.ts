import { FetchCallProps } from "../typedef/typedef";

 export const fetchCall = async ({
    url, 
    searchQuery
 }: FetchCallProps) => {
    let urlWithQuery = `${url}${searchQuery}`;
    const response = await fetch(urlWithQuery);
    const jsonData = await response.json();
    return jsonData;
  };