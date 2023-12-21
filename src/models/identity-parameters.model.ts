import { gql } from "graphql-request";
import { client } from "../client";
import { IdentityParameter } from "../types/identity-parameter.type";

type UpdateIdentityParameterData = {
  overwritten_string_value: string;
  overwritten_integer_value: number;
  overwritten_boolean_value: boolean;
  overwritten_json_value: string;
};

type UpdateIdentityParameterVariables = {
  identityParameterId: string;
  data: UpdateIdentityParameterData;
};

type UpdateIdentityParameterResponse = {
  updateIdentityParameter: IdentityParameter;
};

type ResetIdentityParameterVariables = {
  identityParameterId: string;
};

type ResetIdentityParameterResponse = {
  resetIdentityParameter: IdentityParameter;
};

class IdentityParametersModel {
  public static async updateIdentityParameter(
    variables: UpdateIdentityParameterVariables
  ) {
    const document = gql`
      mutation UpdateIdentityParameter(
        $identityParameterId: String!
        $data: IdentityParameterInputType!
      ) {
        updateIdentityParameter(
          identityParameterId: $identityParameterId
          data: $data
        ) {
          id
        }
      }
    `;

    const result = await client.request<
      UpdateIdentityParameterResponse,
      UpdateIdentityParameterVariables
    >(document, variables);

    return result.updateIdentityParameter;
  }

  public static async resetIdentityParameter(
    variables: ResetIdentityParameterVariables
  ) {
    const document = gql`
      mutation ResetIdentityParameter($identityParameterId: String!) {
        resetIdentityParameter(identityParameterId: $identityParameterId) {
          id
        }
      }
    `;

    const result = await client.request<
      ResetIdentityParameterResponse,
      ResetIdentityParameterVariables
    >(document, variables);

    return result.resetIdentityParameter;
  }
}

export default IdentityParametersModel;
