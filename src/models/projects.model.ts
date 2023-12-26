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

type GetProjectVariables = {
  projectId: string;
};

type GetProjectResponse = {
  getProject: Project;
};

class ProjectsModel {
  public static async createProject(variables: CreateProjectVariables) {
    const document = gql`
      mutation CreateProject($name: String!) {
        createProject(name: $name) {
          id
          name
          environments {
            id
            name
          }
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
          environments {
            id
            name
          }
        }
      }
    `;

    const result = await client.request<GetProjectsResponse>(document);

    return result.projects;
  }

  public static async getProject(variables: GetProjectVariables) {
    const document = gql`
      query GetProject($projectId: String!) {
        getProject(projectId: $projectId) {
          id
          name
          environments {
            id
            name
          }
        }
      }
    `;

    const result = await client.request<
      GetProjectResponse,
      GetProjectVariables
    >(document, variables);

    return result.getProject;
  }
}

export default ProjectsModel;
