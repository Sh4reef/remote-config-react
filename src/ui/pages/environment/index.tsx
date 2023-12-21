import { Layout, Menu, MenuProps } from "antd";
import { useEffect } from "react";
import { Outlet, useMatch, useNavigate, useParams } from "react-router-dom";

const EnvironmentPage = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const matchedDevelopment = useMatch(":projectId/development/*");
  const matchedProduction = useMatch(":projectId/production/*");

  useEffect(() => {
    if (!(matchedDevelopment || matchedProduction)) {
      navigate("/404");
    }
  }, [matchedDevelopment, matchedProduction, navigate]);

  const items: MenuProps["items"] = [
    {
      key: "dev",
      label: "Development",
      children: [
        {
          key: "dev.parameters",
          label: "Parameters",
          onClick: () => navigate(`/${projectId}/development/parameters`),
        },
        {
          key: "dev.identities",
          label: "Identities",
          onClick: () => navigate(`/${projectId}/development/identities`),
        },
        {
          key: "dev.conditions",
          label: "Conditions",
          onClick: () => navigate(`/${projectId}/development/conditions`),
        },
      ],
    },
    {
      key: "prod",
      label: "Production",
      children: [
        {
          key: "prod.parameters",
          label: "Parameters",
          onClick: () => navigate(`/${projectId}/production/parameters`),
        },
        {
          key: "prod.identities",
          label: "Identities",
          onClick: () => navigate(`/${projectId}/production/identities`),
        },
        {
          key: "prod.conditions",
          label: "Conditions",
          onClick: () => navigate(`/${projectId}/production/conditions`),
        },
      ],
    },
  ];

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
