import React from "react";
import { getStoryIds, storyUrl } from "../services/api";
import Story from "../components/Story";
import {
  GlobalStyle,
  StoriesContainerWrapper,
} from "../styles/StoriesContainerStyles";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import { GET_ALL_ARTICLES } from "../graphql/get-all-articles";
import { useQuery } from "@apollo/client";
export const StoriesContainer = () => {
  const { count } = useInfiniteScroll();
  const { data: { allArticles = [] } = {} } = useQuery(GET_ALL_ARTICLES);

  console.log(allArticles);
  return (
    <>
      <GlobalStyle />
      <StoriesContainerWrapper data-test-id="stories-container">
        <h1>News Stories</h1>
        {allArticles &&
          allArticles
            .slice(0, count)
            .map((story) => <Story key={story.id} story={story} />)}
      </StoriesContainerWrapper>
    </>
  );
};
