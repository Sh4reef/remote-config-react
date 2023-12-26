import { gql } from "graphql-request";
import { client } from "../client";
import { Condition } from "../types/condition.type";

type GetConditionsVariables = {
  environmentId: string;
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
      query Conditions($environmentId: String!) {
        conditions(environmentId: $environmentId) {
          id
          name
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
