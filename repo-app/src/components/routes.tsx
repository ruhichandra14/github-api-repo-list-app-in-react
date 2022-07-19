import { Routes, Route } from "react-router-dom";
import Main from "./main";
import RepoDetails from "./repo-details";

const MainContainer = () => {
  return (
    <div className="main-container">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/repoDetails/:repoId" element={<RepoDetails />} />
      </Routes>
    </div>
  );
};

export default MainContainer;
