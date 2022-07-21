
import {
    render,
    screen,
  } from "@testing-library/react";
import Error from "../components/common/error";
import Loading from "../components/common/loading";

describe("Common Screens", () => {
    it("renders error screen correctly", () => {
        render(<Error/>) 
        expect(screen.getByTestId("error")).toBeInTheDocument();
    })

    it("renders loading screen correctly", () => {
        render(<Loading/>) 
        expect(screen.getByText(/Loading the repo details for you/i)).toBeInTheDocument();
    })
})
