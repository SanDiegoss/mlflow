import { Condition, Observer } from '.';

export interface RuleDTO {
  name: string;
  experiment_id: string;
  run_id: string;
  conditions: Condition[];
  observers: Observer[];
}

export interface Rule extends RuleDTO {
  rule_id: string;
}
