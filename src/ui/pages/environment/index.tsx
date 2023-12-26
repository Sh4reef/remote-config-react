import { useQuery } from "@tanstack/react-query";
import { Layout, Menu, MenuProps } from "antd";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import ProjectsModel from "../../../models/projects.model";

const EnvironmentPage = () => {
  const { projectId } = useParams();
  const { data: environments } = useQuery({
    queryKey: ["projects", projectId],
    queryFn: () => ProjectsModel.getProject({ projectId: projectId as string }),
    select(data) {
      return data.environments;
    },
  });
  const navigate = useNavigate();
  // const matchedDevelopment = useMatch(":projectId/development/*");
  // const matchedProduction = useMatch(":projectId/production/*");

  // useEffect(() => {
  //   if (!(matchedDevelopment || matchedProduction)) {
  //     navigate("/404");
  //   }
  // }, [matchedDevelopment, matchedProduction, navigate]);

  const items: MenuProps["items"] = environments?.map((env) => ({
    key: env.id,
    label: env.name,
    children: [
      {
        key: `${env.id}_parameters`,
        label: "Parameters",
        onClick: () => navigate(`/${projectId}/${env.id}/parameters`),
      },
      {
        key: `${env.id}_identities`,
        label: "Identities",
        onClick: () => navigate(`/${projectId}/${env.id}/identities`),
      },
      {
        key: `${env.id}_conditions`,
        label: "Conditions",
        onClick: () => navigate(`/${projectId}/${env.id}/conditions`),
      },
    ],
  }));

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout.Sider collapsible>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["dev.parameters"]}
          mode="inline"
          items={items}
        />
      </Layout.Sider>
      <Layout>
        <Layout.Header style={{ padding: 0 }} />
        <Layout.Content style={{ margin: 16 }}>
          <Outlet />
        </Layout.Content>
        <Layout.Footer style={{ textAlign: "center" }}>
          Ant Design ©2023 Created by Ant UED
        </Layout.Footer>
      </Layout>
    </Layout>
  );
};

export default EnvironmentPage;
