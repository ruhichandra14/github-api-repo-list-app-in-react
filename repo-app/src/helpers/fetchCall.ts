import { FetchCallProps } from "../typedef/typedef";

 export const fetchCall = async ({
    url, 
    searchQuery
 }: FetchCallProps) => {
    let urlWithQuery = `${url}${searchQuery}`;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 5000); // cancel if request times out
    const response = await fetch(urlWithQuery, {signal: controller.signal });
    const jsonData = await response.json();
    clearTimeout(timer);
    return jsonData;
  };