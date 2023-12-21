import { Button, Card, Col, Form, Input, Row, Typography } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import RulesListForm from "./rules-list-form";
import getValueTypeField from "../../../helpers";

const ConditionsListForm = () => {
  return (
    <Form.List name="conditions">
      {(fields, { add, remove }) => {
        return (
          <Card
            title={
              <Row justify="space-between">
                <Col>
                  <Typography.Text>Conditions</Typography.Text>
                </Col>
                <Col>
                  <Button onClick={() => add()}>Add</Button>
                </Col>
              </Row>
            }
          >
            {fields.map((field) => {
              return (
                <Card
                  key={field.key}
                  title={
                    <Row justify="space-between">
                      <Col></Col>
                      <Col>
                        <CloseCircleOutlined
                          onClick={() => remove(field.name)}
                        />
                      </Col>
                    </Row>
                  }
                >
                  <Form.Item
                    {...field}
                    label="Name"
                    name={[field.name, "name"]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    shouldUpdate={(prevValues, currentVlues) =>
                      prevValues.value_type !== currentVlues.value_type
                    }
                  >
                    {({ getFieldValue }) => {
                      const valueType = getFieldValue("value_type");
                      return getValueTypeField({
                        name: [field.name, `${valueType}_value`],
                        valueType,
                      });
                    }}
                  </Form.Item>
                  <RulesListForm name={[field.name, "rules"]} />
                </Card>
              );
            })}
          </Card>
        );
      }}
    </Form.List>
  );
};

export default ConditionsListForm;
