import { useLocation, useParams } from "react-router-dom";
import LazyImage from "./lazy-img";
import { Buffer } from "buffer";
import { useState, useEffect } from "react";
import moment from "moment";

const RepoDetails = () => {
  const location = useLocation();
  const [repoContents, setRepoContents] = useState("");

  console.log("repo--- ", location.state);

  const repoData = location.state;
  // @ts-ignore
  const {
    owner,
    updated_at,
    url,
    contents_url,
    forks_count,
    watchers_count,
    full_name,
    created_at,
    description,
  } = (repoData as any).repo || {};

  const fetchRepoContents = async () => {
    const contentUrl =
      contents_url.substring(0, contents_url.indexOf("/contents")) + "/readme";
    console.log("urllll ", contentUrl);
    const response = await fetch(contentUrl);
    const jsonData = await response.json();
    const buf = Buffer.from(jsonData?.content, "base64");
    const buffedInput = buf.toString("ascii");
    // @ts-ignore
    setRepoContents(buffedInput);
    console.log("atonnn data", buffedInput);
  };

  const getLocalTimeZone = (originalDate: any) => {
    const parsedDate = moment(originalDate);
    return moment(parsedDate).local();
    

  };

  useEffect(() => {
    fetchRepoContents();
  }, []);

  const createdTime = getLocalTimeZone(created_at).toLocaleString();
  const updatedTime = getLocalTimeZone(updated_at).toLocaleString();

  return (
    <>
      <div> Repo Details</div>
      <img src={owner?.avatar_url} alt="avatar" className="avatar-image" />
      <div className="about">
      <div>Created at: {createdTime}</div>
        <div>Updated at: {updatedTime}</div>
        
        <div>Fullname: {full_name}</div>
        <div>Repo url: {url}</div>
        <div>Description: {description}</div>

        <div>Forks info: {forks_count}</div>
        <div>Watchers info: {watchers_count}</div>

        <div className="repo-contents">{repoContents}</div>
      </div>
    </>
  );
};

export default RepoDetails;
