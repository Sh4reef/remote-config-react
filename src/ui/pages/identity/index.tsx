import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Card, Col, Popconfirm, Row, Space, Table } from "antd";
import { useParams } from "react-router-dom";
import IdentitiesModel from "../../../models/identities.model";
import { useMemo } from "react";
import { ColumnsType } from "antd/es/table";
import { IdentityParameter } from "../../../types/identity-parameter.type";
import IdentityParametersModel from "../../../models/identity-parameters.model";
import { EditOutlined, ReloadOutlined } from "@ant-design/icons";
import { useSetAtom } from "jotai";
import identityParameterFormDrawerAtom from "../../views/identity-parameter-form-drawer/atom";

const IdentityPage = () => {
  const { identityId } = useParams();
  const seState = useSetAtom(identityParameterFormDrawerAtom);
  const queryClient = useQueryClient();
  const { data: identity } = useQuery({
    queryKey: ["identities", identityId],
    queryFn: () =>
      IdentitiesModel.getIdentity({ identityId: identityId as string }),
  });
  const mutationResetIdentityParameter = useMutation({
    mutationFn: IdentityParametersModel.resetIdentityParameter,
  });

  const identityParameters = useMemo(() => {
    return identity?.parameters;
  }, [identity]);

  const openIdentityParameterFromDrawer = (identityParameterId: string) => {
    seState({ open: true, identityParameterId });
  };

  const handleResetIdentityParameter = async (identityParameterId: string) => {
    await mutationResetIdentityParameter.mutateAsync({ identityParameterId });
    queryClient.invalidateQueries({ queryKey: ["identities", identityId] });
  };

  const parametersColumns: ColumnsType<IdentityParameter> = [
    {
      title: "Parameter",
      dataIndex: "parameter",
      render(value: IdentityParameter["parameter"]) {
        return value.parameter;
      },
    },
    {
      title: "Value",
      dataIndex: "isOverwritten",
      render(isOverwritten, record) {
        const valueType = record.parameter.value_type;
        if (isOverwritten) {
          const value = record[`overwritten_${valueType}_value`];
          switch (valueType) {
            case "boolean":
              return value ? "True" : "False";
            case "json":
              return JSON.stringify(value);
            default:
              return value;
          }
        } else {
          const value = record.parameter[`${valueType}_value`];
          switch (valueType) {
            case "boolean":
              return value ? "True" : "False";
            case "json":
              return JSON.stringify(value);
            default:
              return value;
          }
        }
      },
    },
    {
      title: "Actions",
      dataIndex: "id",
      render(id, record) {
        return (
          <Space>
            <Button
              size="small"
              icon={<EditOutlined />}
              onClick={() => openIdentityParameterFromDrawer(id)}
            />
            {record.isOverwritten && (
              <Popconfirm
                title={`This will reset ${record.parameter.parameter} to the environment defaults`}
                onConfirm={() => handleResetIdentityParameter(id)}
              >
                <Button size="small" type="link" icon={<ReloadOutlined />}>
                  Reset
                </Button>
              </Popconfirm>
            )}
          </Space>
        );
      },
    },
  ];

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Card title="Parameters">
          <Table
            rowKey="id"
            columns={parametersColumns}
            dataSource={identityParameters}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default IdentityPage;
