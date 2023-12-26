import { Rule } from "./rule.type";

export type Condition = {
  id: string;
  name: string;
  rules: Rule[];
};
