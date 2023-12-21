import { Parameter } from "./parameter.type";


export type IdentityParameter = {
    id: string;
    isOverwritten: boolean;
    overwritten_string_value?: string;
    overwritten_json_value?: object;
    overwritten_integer_value?: number;
    overwritten_boolean_value?: boolean;
    parameter: Parameter;
};
