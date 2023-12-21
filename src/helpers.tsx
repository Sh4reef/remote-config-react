import { Editor } from "@monaco-editor/react";
import { Form, Input, InputNumber, Radio } from "antd";

const getValueTypeField = ({
  name,
  valueType,
}: {
  name: string | Array<string | number>;
  valueType: string;
}) => {
  let valueInputComponent;
  switch (valueType) {
    case "string":
      valueInputComponent = <Input />;
      break;
    case "integer":
      valueInputComponent = <InputNumber />;
      break;
    case "boolean":
      valueInputComponent = (
        <Radio.Group
          options={[
            { label: "True", value: true },
            { label: "False", value: false },
          ]}
        />
      );
      break;
    case "json":
      valueInputComponent = <Editor height={168} defaultLanguage="json" />;
      break;
    default:
      return <></>;
  }
  return (
    <Form.Item name={name} label="Value">
      {valueInputComponent}
    </Form.Item>
  );
};

export default getValueTypeField;
