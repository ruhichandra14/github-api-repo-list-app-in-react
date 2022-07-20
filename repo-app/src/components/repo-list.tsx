import { useEffect, useState } from "react";
import LazyImage from "./common/lazy-img";
import { Link } from "react-router-dom";
import Loading from "./common/loading";
import RepoItem from "./repo-item";
import { createObserver, onContentInView } from "../helpers/observer";
import { RepoListProps } from "../typedef/typedef";
import { CLICK_FIND_MORE } from "../constants/constants";

const RepoList = ({ repoList, isLoading }: RepoListProps) => {
  const [imageObserver, setImageObserver] = useState(null);

  useEffect(() => {
    const imageObserver = createObserver(onContentInView);
    // @ts-ignore
    setImageObserver(imageObserver);

    return () => {
      imageObserver.disconnect();
    };
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  const repos = repoList.items;

  return (
    <>
      <section>
        <ul className="repo-list-container">
          {repos?.map((repo: any) => {
            const { id, name, full_name, owner, description } = repo || {};
            return (
              <li className="repo-list-item" key={id}>
                <Link
                  to={{ pathname: `/repoDetails/${id}` }}
                  state={{ repo: repo }}
                  className="details-link"
                >
                  <div className="repo-card">
                    {
                      <LazyImage
                        key={id}
                        observer={imageObserver}
                        src={owner.avatar_url}
                        alt="avatar"
                      />
                    }
                    <div className="repo-details">
                      <RepoItem name="Repo" value={name} />
                      <RepoItem name="About" value={full_name} />
                      <RepoItem
                        name="More Details"
                        value={description || CLICK_FIND_MORE}
                      />
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
};

export default RepoList;
