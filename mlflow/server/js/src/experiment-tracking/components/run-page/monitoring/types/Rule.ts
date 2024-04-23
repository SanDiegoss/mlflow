import { ConditionBlock, Observer } from ".";

export interface Rule {
    id: string,
    name: string,
    experimentId: string,
    runUuid: string,
    conditions: ConditionBlock[],
    observers: Observer[]
}