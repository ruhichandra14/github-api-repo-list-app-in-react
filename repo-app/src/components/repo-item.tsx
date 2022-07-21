import { RepoItemProps } from "../typedef/typedef";

// This component gives the repo individual attributes 
const RepoItem = ({ name, value }: RepoItemProps) => {
  let itemVal = value;
  // edge case
  if (typeof value === "string" && value?.indexOf(' ') === -1) {
    itemVal = value.substring(0, 15);
  }
  console.log("value.substring(0, 100)", value)
  return (
    <div className="repo-card-attr">
      <span className="repo-card-attr-name">{name}:</span>
      <span className="repo-card-attr-value">{itemVal}</span>
    </div>
  );
};

export default RepoItem;
