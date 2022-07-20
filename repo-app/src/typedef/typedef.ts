export type LazyImgProps = {
  observer: any;
  src: string;
  alt: string;
};

export type SearchProps = {
  inputVal: string
  onInputChangeHandler: (e: any) => void;
  searchResults: JSX.Element | null;
}

export type HeaderProps = {
  title: string;
};

export type RepoItemProps = {
  name: string;
  value: string;
};

type Owner = {
  avatar_url: string;
};

type Repo = {
  owner: Owner;
  contents_url: string;
  forks_count: string;
  full_name: string;
  created_at: string;
  description: string;
};

export type RepoData = {
  items: Array<Repo>;
};

export type FetchCallProps = {
  searchQuery?: string;
  url: string;
};

export type RepoListProps = {
  repoList: RepoData;
  isLoading: boolean;
};

export type RepoDetailsProps = {
  repo: Repo;
};
