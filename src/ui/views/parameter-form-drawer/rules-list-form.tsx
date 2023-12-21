import { CloseCircleOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  List,
  Row,
  Select,
  SelectProps,
  Space,
  Typography,
} from "antd";
import React from "react";

interface RulesListFormProps {
  name: (string | number)[];
}

const PlatformOptions: SelectProps["options"] = [
  {
    label: "Web",
    value: "web",
  },
  {
    label: "iOS",
    value: "ios",
  },
  {
    label: "Android",
    value: "android",
  },
];

const LanguageOptions: SelectProps["options"] = [
  {
    label: "English",
    value: "english",
  },
  {
    label: "Arabic",
    value: "arabic",
  },
];

const CountryOptions: SelectProps["options"] = [
  {
    label: "Saudi Arabia",
    value: "saudi_arabia",
  },
  {
    label: "United States",
    value: "united_states",
  },
];

const RulesListForm: React.FC<RulesListFormProps> = ({ name }) => {
  return (
    <Form.List name={name}>
      {(fields, { add, remove }) => (
        <List
          header={
            <Row justify="space-between">
              <Col>
                <Typography.Text>Rules</Typography.Text>
              </Col>
              <Col>
                <Button onClick={() => add()}>Add</Button>
              </Col>
            </Row>
          }
          dataSource={fields}
          renderItem={(field) => (
            <List.Item
              actions={[
                <CloseCircleOutlined
                  key={0}
                  onClick={() => remove(field.name)}
                />,
              ]}
            >
              <Row gutter={16} style={{ width: "100%" }}>
                <Col span={8}>
                  <Form.Item shouldUpdate>
                    {({ getFieldValue }) => {
                      const rules: string[] = getFieldValue([
                        "conditions",
                        ...name,
                      ]).map((rule: { [key: string]: string }) => rule?.rule);
                      return (
                        <Form.Item name={[field.name, "rule"]} label="Rule">
                          <Select
                            options={[
                              {
                                label: "Datetime",
                                value: "datetime",
                                disabled: rules.includes("datetime"),
                              },
                              {
                                label: "Platform",
                                value: "platform",
                                disabled: rules.includes("platform"),
                              },
                              {
                                label: "Language",
                                value: "language",
                                disabled: rules.includes("language"),
                              },
                              {
                                label: "Country",
                                value: "country",
                                disabled: rules.includes("country"),
                              },
                            ]}
                          />
                        </Form.Item>
                      );
                    }}
                  </Form.Item>
                </Col>
                <Col flex="auto">
                  <Form.Item
                    shouldUpdate={(prevValues, currentValues) => {
                      return (
                        prevValues["conditions"][name[0]]["rules"][field.name]
                          ?.rule !==
                        currentValues["conditions"][name[0]]["rules"][
                          field.name
                        ]?.rule
                      );
                    }}
                  >
                    {({ getFieldValue }) => {
                      const rule = getFieldValue([
                        "conditions",
                        ...name,
                        field.name,
                        "rule",
                      ]);

                      switch (rule) {
                        case "datetime":
                          return (
                            <Space size={16}>
                              <Form.Item
                                name={[field.name, rule]}
                                label="Datetime"
                              >
                                <DatePicker />
                              </Form.Item>
                              <Form.Item
                                name={[field.name, "before_datetime"]}
                                label="Before Datetime?"
                                valuePropName="checked"
                              >
                                <Checkbox />
                              </Form.Item>
                            </Space>
                          );
                        case "platform":
                          return (
                            <Form.Item
                              name={[field.name, rule]}
                              label="Platform"
                            >
                              <Select options={PlatformOptions} />
                            </Form.Item>
                          );
                        case "language":
                          return (
                            <Form.Item
                              name={[field.name, rule]}
                              label="Language"
                            >
                              <Select options={LanguageOptions} />
                            </Form.Item>
                          );
                        case "country":
                          return (
                            <Form.Item
                              name={[field.name, rule]}
                              label="Country"
                            >
                              <Select options={CountryOptions} />
                            </Form.Item>
                          );
                        default:
                          return <></>;
                      }
                    }}
                  </Form.Item>
                </Col>
              </Row>
            </List.Item>
          )}
        />
      )}
    </Form.List>
  );
};

export default RulesListForm;
