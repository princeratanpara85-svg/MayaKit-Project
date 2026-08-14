import { TOPICS } from "@/data/topics";

export function getTopicForPalette(index: number) {
  return TOPICS[index % TOPICS.length];
}
