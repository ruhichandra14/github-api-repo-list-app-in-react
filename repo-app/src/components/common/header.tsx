import { HeaderProps } from "../../typedef/typedef";

const Header = ({ title }: HeaderProps) => {
  return <header className="main-header">{title}</header>;
};

export default Header;
