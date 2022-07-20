import { RepoItemProps } from "../typedef/typedef";

const RepoItem = ({ name, value }: RepoItemProps) => {
  return (
    <div className="repo-card-attr">
      <span className="repo-card-attr-name">{name}:</span>
      <span className="repo-card-attr-value">{value}</span>
    </div>
  );
};

export default RepoItem;
