import { gql } from "graphql-request";
import { client } from "../client";
import { Parameter } from "../types/parameter.type";
import { EnvironmentEnum } from "../enums";

type GetParametersVariables = {
  projectId: string;
  environment: EnvironmentEnum;
};

type GetParametersResponse = {
  parameters: Parameter[];
};

export type ParameterDataVariable = {
  parameter: string;
  value_type: string;
  string_value: string;
  integer_value: number;
  boolean_value: boolean;
  json_value: string;
  conditions: Array<{
    name: string;
    string_value: string;
    integer_value: number;
    boolean_value: boolean;
    json_value: string;
    rules: Array<{
      rule: string;
      datetime?: string;
    }>;
  }>;
  enabled: boolean;
};

type CreateParameterVariables = {
  projectId: string;
  environment: string;
  data: ParameterDataVariable;
};

type UpdateParameterVariables = {
  parameterId: string;
  data: ParameterDataVariable;
};

type CreateParameterResponse = {
  createParameter: Parameter;
};

type UpdateParameterResponse = {
  updateParameter: Parameter;
};

type GetParameterVariables = {
  parameterId: string;
};

type GetParameterResponse = {
  getParameter: Parameter;
};

type DeleteParameterVariables = GetParameterVariables;

type DeleteParameterResponse = {
  deleteParameter: Parameter;
};

class ParametersModel {
  public static async getParameters(variables: GetParametersVariables) {
    const document = gql`
      query Parameters($projectId: String!, $environment: EnvironmentEnum!) {
        parameters(projectId: $projectId, environment: $environment) {
          id
          parameter
          value_type
          string_value
          integer_value
          boolean_value
          json_value
          enabled
        }
      }
    `;

    const result = await client.request<
      GetParametersResponse,
      GetParametersVariables
    >(document, variables);

    return result.parameters;
  }

  public static async createParameter(variables: CreateParameterVariables) {
    const document = gql`
      mutation CreateParameter(
        $projectId: String!
        $data: ParameterInputType!
        $environment: EnvironmentEnum!
      ) {
        createParameter(
          projectId: $projectId
          data: $data
          environment: $environment
        ) {
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
    `;

    const result = await client.request<
      CreateParameterResponse,
      CreateParameterVariables
    >(document, variables);

    return result.createParameter;
  }

  public static async updateParameter(variables: UpdateParameterVariables) {
    const document = gql`
      mutation UpdateParameter(
        $parameterId: String!
        $data: ParameterInputType!
      ) {
        updateParameter(parameterId: $parameterId, data: $data) {
          id
        }
      }
    `;

    const result = await client.request<
      UpdateParameterResponse,
      UpdateParameterVariables
    >(document, variables);

    return result.updateParameter;
  }

  public static async getParameter(variables: GetParameterVariables) {
    const document = gql`
      query GetParameter($parameterId: String!) {
        getParameter(parameterId: $parameterId) {
          id
          parameter
          enabled
          string_value
          value_type
          integer_value
          boolean_value
          json_value
          conditionValues {
            string_value
            integer_value
            boolean_value
            json_value
            condition {
              id
              name
              rules {
                id
                before_datetime
                country
                datetime
                language
                platform
                rule
              }
            }
          }
        }
      }
    `;

    const result = await client.request<
      GetParameterResponse,
      GetParameterVariables
    >(document, variables);

    return result.getParameter;
  }

  public static async deleteParameter(variables: DeleteParameterVariables) {
    const document = gql`
      mutation DeleteParameter($parameterId: String!) {
        deleteParameter(parameterId: $parameterId) {
          id
        }
      }
    `;

    const result = await client.request<
      DeleteParameterResponse,
      DeleteParameterVariables
    >(document, variables);

    return result.deleteParameter;
  }
}

export default ParametersModel;
