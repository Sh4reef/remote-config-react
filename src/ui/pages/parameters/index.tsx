import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  Button,
  Card,
  Col,
  Popconfirm,
  Row,
  Space,
  Table,
  Typography,
} from "antd";
import ParametersModel from "../../../models/parameters.model";
import { useParams } from "react-router-dom";
import { ColumnsType } from "antd/es/table";
import { Parameter } from "../../../types/parameter.type";
import { useAtom } from "jotai";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import parameterFormDrawerAtom from "../../views/parameter-form-drawer/atom";

const ParametersPage = () => {
  const { projectId, environmentId } = useParams();
  const [, setCreateParameterDrawerState] = useAtom(parameterFormDrawerAtom);
  const queryClient = useQueryClient();
  const { data: parameters } = useQuery({
    queryKey: ["parameters", projectId, environmentId],
    queryFn: () =>
      ParametersModel.getParameters({
        environmentId: environmentId as string,
      }),
    placeholderData: keepPreviousData,
    enabled: !!projectId && !!environmentId,
  });
  const mutationDeleteParameter = useMutation({
    mutationFn: ParametersModel.deleteParameter,
  });

  const openParameterFormDrawer = (parameterId?: string) => {
    setCreateParameterDrawerState({ open: true, parameterId });
  };

  const handleDeleteParameter = async (parameterId: string) => {
    await mutationDeleteParameter.mutateAsync({ parameterId });
    queryClient.invalidateQueries({
      queryKey: ["parameters", projectId, environmentId],
    });
  };

  const columns: ColumnsType<Parameter> = [
    {
      title: "Parameter",
      dataIndex: "parameter",
    },
    {
      title: "Enabled",
      dataIndex: "enabled",
      render(value: Parameter["enabled"]) {
        return value ? "Yes" : "No";
      },
    },
    {
      title: "Value Type",
      dataIndex: "value_type",
    },
    {
      title: "Value",
      dataIndex: "value_type",
      render(value: Parameter["value_type"], record) {
        return record[`${value}_value`] ? "True" : "False";
      },
    },
    {
      title: "Actions",
      dataIndex: "id",
      render(id) {
        return (
          <Space>
            <Button
              size="small"
              icon={<EditOutlined />}
              onClick={() => openParameterFormDrawer(id)}
            />
            <Popconfirm
              title="Are you sure you want to proceed?"
              onConfirm={() => handleDeleteParameter(id)}
            >
              <Button size="small" icon={<DeleteOutlined />} danger />
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  return (
    <Card
      title={
        <Row justify="space-between">
          <Col>
            <Typography.Text>Parameters</Typography.Text>
          </Col>
          <Col>
            <Button onClick={() => openParameterFormDrawer()}>
              Create Parameter
            </Button>
          </Col>
        </Row>
      }
    >
      <Table rowKey="id" columns={columns} dataSource={parameters} />
    </Card>
  );
};

export default ParametersPage;
