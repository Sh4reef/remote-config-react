import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Card, Popconfirm, Table } from "antd";
import { useParams } from "react-router-dom";
import ConditionsModel from "../../../models/conditions.model";
import { EnvironmentEnum } from "../../../enums";
import { ColumnsType } from "antd/es/table";
import { Condition } from "../../../types/condition.type";
import Rules from "./partials/rules";
import { DeleteOutlined } from "@ant-design/icons";

const ConditionsPage = () => {
  const { projectId, environment } = useParams();
  const queryClient = useQueryClient();
  const { data: conditions } = useQuery({
    queryKey: ["conditions", projectId, environment],
    queryFn: () =>
      ConditionsModel.getConditions({
        projectId: projectId as string,
        environment: environment as EnvironmentEnum,
      }),
  });
  const mutationDeleteCondition = useMutation({
    mutationFn: ConditionsModel.deleteCondition,
  });

  const deleteCondition = async (conditionId: string) => {
    await mutationDeleteCondition.mutateAsync({ conditionId });
    queryClient.invalidateQueries({
      queryKey: ["conditions", projectId, environment],
    });
  };

  const columns: ColumnsType<Condition> = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Actions",
      dataIndex: "x",
      render(_, record) {
        return (
          <Popconfirm
            title={"Are you sure you want to delete this condition?"}
            onConfirm={() => deleteCondition(record.id)}
          >
            <Button size='small' icon={<DeleteOutlined />} danger />
          </Popconfirm>
        );
      },
    },
  ];

  return (
    <Card>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={conditions}
        expandable={{
          expandedRowRender: (record) => <Rules data={record.rules} />,
        }}
        pagination={false}
      />
    </Card>
  );
};

export default ConditionsPage;
