import { Environment } from "./environment.type";

export type Project = {
  id: string;
  name: string;
  environments: Array<Environment>;
};
