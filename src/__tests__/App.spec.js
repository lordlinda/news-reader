import React from "react";
import { render, cleanup, waitFor } from "@testing-library/react";
import App from "../App";
import { storyIds, singularStory } from "../fixtures";
import { getStory, getStoryIds } from "../services/api";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import { STORY_INCREMENT } from "../constants";

//before each test we have to do a cleanup
beforeEach(cleanup);
jest.mock("../hooks/useInfiniteScroll.js");

jest.mock("../services/api", () => ({
  getStory: jest.fn(),
  getStoryIds: jest.fn(),
}));

test("renders the app", async () => {
  useInfiniteScroll.mockImplementation(() => ({
    count: STORY_INCREMENT,
  }));
  getStory.mockImplementation(() => Promise.resolve(singularStory));
  getStoryIds.mockImplementation(() => Promise.resolve(storyIds));
  const { getByText, queryByTestId } = render(<App />);
  await waitFor(() => [
    expect(getByText("Hacker News Stories")).toBeTruthy(),
    expect(getByText("Tarnished: Google Responds")).toBeTruthy(),
    expect(queryByTestId("story-by").textContent).toEqual("By: Karl Hadwen"),
  ]);
});
/** 



test("renders the application", async () => {
  
  

  
});
**/
