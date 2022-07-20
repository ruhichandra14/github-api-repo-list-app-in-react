import { Routes, Route } from "react-router-dom";
import SearchReposContainer from "./list-wrapper";
import RepoDetails from "./repo-details";
import { ErrorBoundary } from "react-error-boundary";
import Error from "./common/error";

const MainContainer = () => {
  const ErrorFallBack = () => <Error />;
  return (
    <div className="main-container">
      <ErrorBoundary
        FallbackComponent={ErrorFallBack}
        onReset={() => window.location.reload()}
      >
        <Routes>
          <Route path="/" element={<SearchReposContainer />} />
          <Route path="/repoDetails/:repoId" element={<RepoDetails />} />
        </Routes>
      </ErrorBoundary>
    </div>
  );
};

export default MainContainer;
