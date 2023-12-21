export type Parameter = {
  id: string;
  parameter: string;
  value_type: "string" | "integer" | "boolean" | "json";
  string_value?: string;
  integer_value?: number;
  boolean_value?: boolean;
  json_value?: string;
  enabled: boolean;
  conditionValues?: Array<{
    string_value?: string;
    integer_value?: number;
    boolean_value?: boolean;
    json_value?: object;
    condition: {
      id: string;
      name: string;
      rules: Array<{
        id: string;
        before_datetime?: boolean;
        country?: string;
        datetime?: string;
        language?: string;
        platform?: string;
        rule: string;
      }>;
    };
  }>;
};
