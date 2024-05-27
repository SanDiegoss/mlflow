import { Condition, Observer } from '.';

export interface RuleDTO {
  name: string;
  experimentId: string;
  runUuid: string;
  conditions: Condition[];
  observers: Observer[];
}

export interface Rule extends RuleDTO {
  id: string;
}
