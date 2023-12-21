import { gql } from "graphql-request";
import { client } from "../client";
import { Condition } from "../types/condition.type";
import { EnvironmentEnum } from "../enums";

type GetConditionsVariables = {
  projectId: string;
  environment: EnvironmentEnum;
};

type GetConditionsResponse = {
  conditions: Condition[];
};

type DeleteConditionVariables = {
  conditionId: string;
};

type DeleteConditionResponse = {
  deleteCondition: Condition;
};

class ConditionsModel {
  public static async getConditions(variables: GetConditionsVariables) {
    const document = gql`
      query Conditions($projectId: String!, $environment: EnvironmentEnum!) {
        conditions(projectId: $projectId, environment: $environment) {
          id
          name
          projectId
          rules {
            id
            datetime
            country
            conditionId
            before_datetime
            language
            platform
            rule
          }
          anotherEnvironmentConditionId
        }
      }
    `;

    const result = await client.request<
      GetConditionsResponse,
      GetConditionsVariables
    >(document, variables);

    return result.conditions;
  }

  public static async deleteCondition(variables: DeleteConditionVariables) {
    const document = gql`
      mutation DeleteCondition($conditionId: String!) {
        deleteCondition(conditionId: $conditionId) {
          id
        }
      }
    `;

    const result = await client.request<
      DeleteConditionResponse,
      DeleteConditionVariables
    >(document, variables);

    return result.deleteCondition;
  }
}

export default ConditionsModel;
