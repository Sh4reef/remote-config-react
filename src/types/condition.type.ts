import { Rule } from "./rule.type";

export type Condition = {
  id: string;
  name: string;
  projectId: string;
  rules: Rule[];
};
