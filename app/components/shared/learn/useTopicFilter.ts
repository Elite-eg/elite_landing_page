"use client";

import { useState } from "react";
import { LEARN_TOPICS, type LearnTopic, type TopicFilterValue } from "./learnData";

export interface TopicFilterState<T> {
  /** "all", then only the topics that have items, in taxonomy order. */
  options: TopicFilterValue[];
  value: TopicFilterValue;
  setValue: (value: TopicFilterValue) => void;
  /** The items of the chosen topic (all of them for "all"). */
  items: readonly T[];
}

/** Topic filter over a list of library items (videos, articles). */
export function useTopicFilter<T extends { topic: LearnTopic }>(allItems: readonly T[]): TopicFilterState<T> {
  const [value, setValue] = useState<TopicFilterValue>("all");

  const options: TopicFilterValue[] = ["all", ...LEARN_TOPICS.filter((topic) => allItems.some((item) => item.topic === topic))];
  const items = value === "all" ? allItems : allItems.filter((item) => item.topic === value);

  return { options, value, setValue, items };
}
