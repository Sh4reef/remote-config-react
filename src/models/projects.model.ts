import { gql } from "graphql-request";
import { client } from "../client";
import { Project } from "../types/project.type";

export type CreateProjectVariables = {
  name: string;
};

type CreateProjectResponse = {
  createProject: Project;
};

type GetProjectsResponse = {
  projects: Project[];
};

class ProjectsModel {
  public static async createProject(variables: CreateProjectVariables) {
    const document = gql`
      mutation CreateProject($name: String!) {
        createProject(name: $name) {
          id
          name
        }
      }
    `;
    const result = await client.request<
      CreateProjectResponse,
      CreateProjectVariables
    >(document, variables);

    return result.createProject;
  }

  public static async getProjects() {
    const document = gql`
      query Projects {
        projects {
          id
          name
        }
      }
    `;

    const result = await client.request<GetProjectsResponse>(document);

    return result.projects;
  }
}

export default ProjectsModel;
