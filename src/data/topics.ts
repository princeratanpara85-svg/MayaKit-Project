export const TOPICS = ["portfolio", "school", "sports", "ecommerce", "product"] as const;

export type Topic = (typeof TOPICS)[number];
