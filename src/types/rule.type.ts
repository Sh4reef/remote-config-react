import { CountryEnum, LanguageEnum, PlatformEnum, RuleEnum } from "../enums";

export type Rule = {
  id: string;
  datetime?: string;
  country?: CountryEnum;
  conditionId: string;
  before_datetime?: boolean;
  language?: LanguageEnum;
  platform?: PlatformEnum;
  rule: RuleEnum;
};
