import { createBrowserRouter } from "react-router-dom";
import DashboardPage from "./ui/pages/dashboard";
import LoginPage from "./ui/pages/login";
import ParametersPage from "./ui/pages/parameters";
import EnvironmentPage from "./ui/pages/environment";
import ProjectsPage from "./ui/pages/projects";
import IdentitiesPage from "./ui/pages/identities";
import IdentityPage from "./ui/pages/identity";
import ConditionsPage from "./ui/pages/conditions";

const router = createBrowserRouter([
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <DashboardPage />,
    children: [
      {
        path: "projects",
        element: <ProjectsPage />,
      },
      {
        path: ":projectId/:environment",
        element: <EnvironmentPage />,
        children: [
          {
            path: "parameters",
            element: <ParametersPage />,
          },
          {
            path: "identities",
            element: <IdentitiesPage />,
          },
          {
            path: "identities/:identityId",
            element: <IdentityPage />,
          },
          {
            path: "conditions",
            element: <ConditionsPage />,
          },
        ],
      },
    ],
  },
]);

export default router;
