export interface Condition {
    metric: string,
    condition: any,
    value: number
}

export type ConditionBlock = Condition[];

export enum ConditionType {
    MORE = 'more',
    EQUAL = 'equal',
    LESS = 'less',
    NOT_EQUAL = 'not_equal'
}