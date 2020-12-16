/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { STORY_INCREMENT, MAX_STORIES } from "../constants";
import { debounce } from "../utils/debounce";

export const useInfiniteScroll = () => {
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(STORY_INCREMENT);

  const handleScroll = debounce(() => {
    if (
      //innerHeight is the height of the tab or frame viewport
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      loading
    ) {
      return false;
    }

    setLoading(true);
  }, 500);

  useEffect(() => {
    if (!loading) return;

    //if we have reached the limit just set the count to all the
    //stories
    if (count + STORY_INCREMENT >= MAX_STORIES) {
      setCount(MAX_STORIES);
    } else {
      //otherwise increase the count by the increment
      setCount(count + STORY_INCREMENT);
    }

    //return the data
    setLoading(false);
  }, [loading]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { count };
};
