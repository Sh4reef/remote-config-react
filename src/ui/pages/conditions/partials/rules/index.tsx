import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { Rule } from "../../../../../types/rule.type";
import React from "react";
import { RuleEnum } from "../../../../../enums";

interface RulesProps {
  data: Rule[];
}

const Rules: React.FC<RulesProps> = ({ data }) => {
  const columns: ColumnsType<Rule> = [
    { title: "Rule", dataIndex: "rule" },
    {
      title: "Value",
      dataIndex: "rule",
      render(value: Rule["rule"], record) {
        switch (value) {
          case RuleEnum.datetime:
            return `${
              record.before_datetime ? "Before" : "After"
            } the date of: ${record[value]}`;
          case RuleEnum.platform:
          case RuleEnum.language:
          case RuleEnum.country:
          default:
            return record[value];
        }
      },
    },
  ];
  return (
    <Table rowKey="id" columns={columns} dataSource={data} pagination={false} />
  );
};

export default Rules;
