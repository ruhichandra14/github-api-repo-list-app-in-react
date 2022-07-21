import { Selector, RequestMock } from "testcafe";
import { repoData } from "./tests/mocks/repo-data";

const mockNetworkResponse = (mockResponse: any, status = 200) =>
  RequestMock()
    .onRequestTo(`https://api.github.com/search/repositories?q=hello`)
    .respond(mockResponse, status);

fixture`Testing find your repo application`
  .page`https://localhost:3000`.requestHooks(
  mockNetworkResponse({ items: repoData }, 200)
);
test("Repo App Runs successfully", async (t) => {
  const repoHeader = Selector("header");
  const searchInput = Selector("input");

  await t
    .expect(repoHeader.exists)
    .ok()
    .expect(searchInput.exists)
    .ok()
    .typeText(searchInput, "hello")
    .wait(1000);
  await t.expect(Selector("div").withText("hello world").exists).ok();
});
