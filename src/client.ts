import { message } from "antd";
import {
  GraphQLClient,
  RequestMiddleware,
  ResponseMiddleware,
} from "graphql-request";

const GRAPHQL_ENDPOINT = import.meta.env.VITE_GRAPHQL_ENDPOINT;

const abortController = new AbortController();

const requestMiddleware: RequestMiddleware = async (request) => {
  return {
    ...request,
    headers: {
      ...request.headers,
      authorization: await Promise.resolve(
        sessionStorage.getItem("token") || ""
      ),
    },
  };
};

const responseMiddleware: ResponseMiddleware = (response) => {
  if (response instanceof Error) {
    const errorMessage = response.message.split(":")[0];
    message.error(errorMessage);

    if (errorMessage.includes("Not Authorised!"))
      sessionStorage.removeItem("token");
  }
};

export const client = new GraphQLClient(GRAPHQL_ENDPOINT, {
  signal: abortController.signal,
  requestMiddleware,
  responseMiddleware,
});
