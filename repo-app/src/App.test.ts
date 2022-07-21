import { Selector } from "testcafe";
import { repoData } from "./tests/mocks/repo-data";

const mock = {
  items: repoData,
};

fixture`Testing find your repo application`
  .page`https://localhost:3000`.requestHooks(mock);
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
  await t.expect(Selector("div").withText("Out of stock").exists).ok();
});
