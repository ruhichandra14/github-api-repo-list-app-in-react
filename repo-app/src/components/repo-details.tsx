import { useLocation } from "react-router-dom";
import { Buffer } from "buffer";
import { useState, useEffect } from "react";
import Header from "./common/header";
import RepoItem from "./repo-item";
import Loading from "./common/loading";
import { getLocalTimeZone } from "../helpers/locale-date";
import { README } from "../constants/constants";
import { RepoDetailsProps } from "../typedef/typedef";

const RepoDetails = () => {
  const location = useLocation();
  const [repoContents, setRepoContents] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const repoDetails = location.state;
  const {
    owner,
    contents_url,
    forks_count,
    full_name,
    created_at,
    description,
  } = (repoDetails as RepoDetailsProps).repo || {};

  const fetchRepoContents = async () => {
    const contentUrl = contents_url.substring(0, contents_url.indexOf("/contents")) + "/readme";
    const response = await fetch(contentUrl);
    const jsonData = await response.json();
    const buf = Buffer.from(jsonData?.content, "base64");
    const buffedInput = buf.toString("ascii");
    setRepoContents(buffedInput);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchRepoContents();
  }, []);

  if (isLoading) return <Loading />;

  return (
    <>
      <Header title="repo details" />
      <article className="repo-details-container">
        <img src={owner?.avatar_url} alt="avatar" className="avatar-image" />
        {isLoading ? (
          <Loading />
        ) : (
          <div className="about">
            <RepoItem
              name="Created at"
              value={getLocalTimeZone(created_at).toLocaleString()}
            />
            <RepoItem name="Fullname" value={full_name} />
            <RepoItem name="Description" value={description} />
            <RepoItem name="Forks count" value={forks_count} />
            <div className="repo-contents-attr">
              <div className="repo-card-attr-name">{README}</div>{" "}
              <div className="repo-contents">{repoContents}</div>
            </div>
          </div>
        )}
      </article>
    </>
  );
};

export default RepoDetails;
