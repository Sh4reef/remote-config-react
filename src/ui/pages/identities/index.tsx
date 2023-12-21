import { useQuery } from "@tanstack/react-query";
import { Button, Card, Space, Table } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import IdentitiesModel from "../../../models/identities.model";
import { ColumnsType } from "antd/es/table";
import { Identity } from "../../../types/identity.type";
import { RightOutlined } from "@ant-design/icons";
import { EnvironmentEnum } from "../../../enums";

const IdentitiesPage = () => {
  const { projectId, environment } = useParams();
  const navigate = useNavigate();
  const { data: identities } = useQuery({
    queryKey: ["identities", projectId, environment],
    queryFn: () =>
      IdentitiesModel.getIdentities({
        projectId: projectId as string,
        environment: environment as EnvironmentEnum,
      }),
  });

  const columns: ColumnsType<Identity> = [
    {
      title: "Identity",
      dataIndex: "identity",
    },
    {
      title: "Actions",
      dataIndex: "identity",
      width: 100,
      render(identity) {
        return (
          <Space>
            <Button
              icon={<RightOutlined />}
              onClick={() => navigate(identity)}
            />
          </Space>
        );
      },
    },
  ];

  return (
    <Card title="Identities">
      <Table rowKey="id" columns={columns} dataSource={identities} />
    </Card>
  );
};

export default IdentitiesPage;
