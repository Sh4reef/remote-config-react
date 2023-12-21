import { Button, Drawer, Form, FormProps } from "antd";
import { useAtom } from "jotai";
import identityParameterFormDrawerAtom from "./atom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Identity } from "../../../types/identity.type";
import getValueTypeField from "../../../helpers";
import { useEffect } from "react";
import { IdentityParameter } from "../../../types/identity-parameter.type";
import IdentityParametersModel from "../../../models/identity-parameters.model";

const IdentityParameterFormDrawer = () => {
  const { identityId } = useParams();
  const [form] = Form.useForm();
  const [state, setState] = useAtom(identityParameterFormDrawerAtom);
  const { open, identityParameterId } = state;
  const queryClient = useQueryClient();
  const identityParameter = queryClient
    .getQueryData<Identity>(["identities", identityId])
    ?.parameters?.find(
      (identityParameter) => identityParameter.id === identityParameterId
    ) as IdentityParameter;
  const mutationUpdateIdentityParameter = useMutation({
    mutationFn: IdentityParametersModel.updateIdentityParameter,
  });

  const valueType = identityParameter?.parameter.value_type;

  const close = () => {
    setState({ open: false, identityParameterId: null });
    form.resetFields();
  };

  const handleFinish: FormProps["onFinish"] = async ({
    overwritten_json_value,
    ...values
  }) => {
    await mutationUpdateIdentityParameter.mutateAsync({
      identityParameterId: identityParameterId as string,
      data: {
        ...values,
        overwritten_json_value:
          overwritten_json_value && JSON.parse(overwritten_json_value),
      },
    });

    queryClient.invalidateQueries({ queryKey: ["identities", identityId] });
    close();
  };

  useEffect(() => {
    if (identityParameter) {
      const isOverwritten = identityParameter.isOverwritten;

      form.setFieldsValue({
        [`overwritten_${valueType}_value`]: isOverwritten
          ? valueType === "json"
            ? JSON.stringify(
                identityParameter[`overwritten_${valueType}_value`]
              )
            : identityParameter[`overwritten_${valueType}_value`]
          : valueType === "json"
          ? JSON.stringify(identityParameter.parameter[`${valueType}_value`])
          : identityParameter.parameter[`${valueType}_value`],
      });
    }
  }, [identityParameter, form, valueType]);

  return (
    <Drawer
      open={open}
      onClose={close}
      width={500}
      footer={
        <Button onClick={form.submit} type="primary" size="large">
          Overwrite
        </Button>
      }
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        {valueType &&
          getValueTypeField({
            name: `overwritten_${valueType}_value`,
            valueType,
          })}
      </Form>
    </Drawer>
  );
};

export default IdentityParameterFormDrawer;
