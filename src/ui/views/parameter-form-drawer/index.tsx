import {
  Button,
  Checkbox,
  Col,
  Drawer,
  Form,
  FormProps,
  Input,
  Row,
  Select,
} from "antd";
import { useAtom } from "jotai";
import parameterFormDrawerAtom from "./atom";
import ConditionsListForm from "./conditions-list-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import dayjs from "dayjs";
import ParametersModel, {
  ParameterDataVariable,
} from "../../../models/parameters.model";
import getValueTypeField from "../../../helpers";

const ParameterFormDrawer = () => {
  const { projectId, environment } = useParams();
  const [state, setState] = useAtom(parameterFormDrawerAtom);
  const [form] = Form.useForm();
  const { open, parameterId } = state;
  const queryClient = useQueryClient();
  const { data: parameter } = useQuery({
    queryKey: ["parameters", parameterId],
    queryFn: () =>
      ParametersModel.getParameter({ parameterId: parameterId as string }),
    enabled: Boolean(parameterId),
  });
  const mutationCreateParameter = useMutation({
    mutationFn: ParametersModel.createParameter,
  });
  const mutationUpdateParameter = useMutation({
    mutationFn: ParametersModel.updateParameter,
  });

  const close = () => {
    form.resetFields();
    setState({ open: false, parameterId: null });
  };

  const handleFinish: FormProps["onFinish"] = async ({
    conditions,
    json_value,
    ...values
  }: ParameterDataVariable) => {
    const formattedData = {
      ...values,
      json_value: json_value && JSON.parse(json_value),
      conditions: conditions?.map(({ rules, json_value, ...condition }) => ({
        ...condition,
        json_value: json_value && JSON.parse(json_value),
        rules: rules?.map(({ datetime, ...rule }) => ({
          ...rule,
          datetime: datetime && dayjs(datetime).toISOString(),
        })),
      })),
    };

    try {
      if (parameter) {
        await mutationUpdateParameter.mutateAsync({
          parameterId: parameterId as string,
          data: formattedData,
        });
      } else {
        await mutationCreateParameter.mutateAsync({
          projectId: projectId as string,
          environment: environment as string,
          data: formattedData,
        });
      }

      close();
      queryClient.invalidateQueries({
        queryKey: ["parameters", projectId, environment],
      });
    } catch (error) {
      /** Error */
    }
  };

  useEffect(() => {
    if (parameter) {
      const { conditionValues, value_type, json_value, ...values } = parameter;
      const conditions = conditionValues?.map((conditionVal) => ({
        id: conditionVal.condition.id,
        name: conditionVal.condition.name,
        [`${value_type}_value`]:
          value_type === "json"
            ? JSON.stringify(conditionVal[`${value_type}_value`], null, 4)
            : conditionVal[`${value_type}_value`],
        rules: conditionVal.condition.rules.map(({ datetime, ...rule }) => ({
          ...rule,
          datetime: datetime && dayjs(datetime),
        })),
      }));
      form.setFieldsValue({
        ...values,
        json_value: json_value && JSON.stringify(json_value, null, 4),
        value_type,
        conditions,
      });
    }
  }, [parameter, form]);

  return (
    <Drawer
      open={open}
      onClose={close}
      title="Create New Parameter"
      width={700}
      footer={
        <Button onClick={form.submit} type="primary" size="large">
          {parameter ? "Update" : "Create"}
        </Button>
      }
    >
      <Form layout="vertical" form={form} onFinish={handleFinish}>
        <Row gutter={16}>
          <Col flex="auto">
            <Form.Item name="parameter" label="Parameter">
              <Input />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              name="enabled"
              label="Enabled"
              valuePropName="checked"
              initialValue={false}
            >
              <Checkbox />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name="value_type" label="Value Type">
          <Select
            options={[
              { label: "String", value: "string" },
              { label: "Integer", value: "integer" },
              { label: "Boolean", value: "boolean" },
              { label: "JSON", value: "json" },
            ]}
          />
        </Form.Item>
        <Form.Item
          shouldUpdate={(prevValues, currentValues) =>
            prevValues.value_type !== currentValues.value_type
          }
        >
          {({ getFieldValue }) => {
            const valueType = getFieldValue("value_type");
            return getValueTypeField({ name: `${valueType}_value`, valueType });
          }}
        </Form.Item>
        <ConditionsListForm />
      </Form>
    </Drawer>
  );
};

export default ParameterFormDrawer;
