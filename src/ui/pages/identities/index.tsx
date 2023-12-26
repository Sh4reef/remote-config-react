import { useQuery } from "@tanstack/react-query";
import { Button, Card, Space, Table } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import IdentitiesModel from "../../../models/identities.model";
import { ColumnsType } from "antd/es/table";
import { Identity } from "../../../types/identity.type";
import { RightOutlined } from "@ant-design/icons";

const IdentitiesPage = () => {
  const { projectId, environmentId } = useParams();
  const navigate = useNavigate();
  const { data: identities } = useQuery({
    queryKey: ["identities", projectId, environmentId],
    queryFn: () =>
      IdentitiesModel.getIdentities({
        environmentId: environmentId as string,
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
