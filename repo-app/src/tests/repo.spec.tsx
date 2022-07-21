import { render, screen } from "@testing-library/react";
import RepoItem from "../components/repo-item";
import Search from "../components/search";

describe("Repo Item", () => {
  it("repo item renders correctly", () => {
    render(<RepoItem name="Name" value="Hello World" />);
    expect(screen.getByText("Name:")).toBeInTheDocument();
    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });

  it("renders repo search correctly", () => {
    const fn = jest.fn();

    render(
      <Search
        inputVal="hello"
        onInputChangeHandler={fn}
        searchAPIRespTime={10}
        showTime={false}
      />
    );
    const inputEl = screen.getByRole("searchbox");
    expect(inputEl).toHaveAttribute("placeholder", "find your repo..");
  });
});
