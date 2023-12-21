import { IdentityParameter } from "./identity-parameter.type";

export type Identity = {
  id: string;
  identity: string;
  parameters: IdentityParameter[];
};
