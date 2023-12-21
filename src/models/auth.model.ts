import { gql } from "graphql-request";
import { client } from "../client";
import { AuthPayload } from "../types/auth-payload.type";

export type LoginVariables = {
  email: string;
  password: string;
};

type LoginResponse = {
  login: AuthPayload;
};

class AuthModel {
  public static async login(variables: LoginVariables) {
    const document = gql`
      mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          token
          user {
            id
            name
            email
            verified
          }
        }
      }
    `;

    const result = await client.request<LoginResponse, LoginVariables>(
      document,
      variables
    );

    sessionStorage.setItem("token", result.login.token);
    client.setHeader("authorization", result.login.token);

    return result;
  }
}

export default AuthModel;
