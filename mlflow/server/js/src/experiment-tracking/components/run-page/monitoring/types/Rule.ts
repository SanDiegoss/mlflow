import { Condition, Observer } from ".";

export interface Rule {
    id: string,
    name: string,
    experimentId: string,
    runUuid: string,
    conditions: Condition[],
    observers: Observer[]
}