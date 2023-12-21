import { gql } from "graphql-request";
import { Identity } from "../types/identity.type";
import { client } from "../client";
import { EnvironmentEnum } from "../enums";

type GetIdentitiesVariables = {
  projectId: string;
  environment: EnvironmentEnum;
};

type GetIdentitiesResponse = {
  identities: Identity[];
};

type GetIdentityVariables = {
  identityId: string;
};

type GetIdentityResponse = {
  getIdentity: Identity;
};

class IdentitiesModel {
  public static async getIdentities(variables: GetIdentitiesVariables) {
    const document = gql`
      query Identities($projectId: String!, $environment: EnvironmentEnum!) {
        identities(projectId: $projectId, environment: $environment) {
          id
          identity
        }
      }
    `;

    const result = await client.request<
      GetIdentitiesResponse,
      GetIdentitiesVariables
    >(document, variables);

    return result.identities;
  }

  public static async getIdentity(variables: GetIdentityVariables) {
    const document = gql`
      query GetIdentity($identityId: String!) {
        getIdentity(identity: $identityId) {
          id
          identity
          parameters {
            id
            isOverwritten
            overwritten_string_value
            overwritten_json_value
            overwritten_integer_value
            overwritten_boolean_value
            parameter {
              id
              parameter
              enabled
              value_type
              string_value
              integer_value
              boolean_value
              json_value
            }
          }
        }
      }
    `;

    const result = await client.request<
      GetIdentityResponse,
      GetIdentityVariables
    >(document, variables);

    return result.getIdentity;
  }
}

export default IdentitiesModel;
