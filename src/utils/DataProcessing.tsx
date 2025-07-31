import _ from 'lodash'
import type { DataRow } from './ExcelParser'

export type FilterMode =
    | 'equals'
    | 'notEquals'
    | 'contains'
    | 'notContains'
    | 'greaterThan'
    | 'greaterThanOrEqual'
    | 'lessThan'
    | 'lessThanOrEqual'

export const filterLabels: Record<FilterMode, string> = {
    equals: 'equals',
    notEquals: 'does not equal',
    contains: 'contains',
    notContains: 'does not contain',
    greaterThan: 'is greater than',
    greaterThanOrEqual: 'is greater than or equal to',
    lessThan: 'is less than',
    lessThanOrEqual: 'is less than or equal to',
}

export type ColumnFilter = {
    column: string
    mode: FilterMode
    value: number | string
}

export type AggregationMode = 'sum' | 'mean' | 'max' | 'min'

export type ColumnAggregation = {
    groupByColumn: string
    valueColumn: string
    mode: AggregationMode
}

export const filterRowsByColumn = (
    rows: DataRow[],
    dataFilter: ColumnFilter
): DataRow[] => {
    switch (dataFilter.mode) {
        case 'equals':
            return rows.filter((row) => {
                if (row[dataFilter.column] === dataFilter.value) {
                    return true
                }
            })
        case 'notEquals':
            return rows.filter(
                (row) => row[dataFilter.column] !== dataFilter.value
            )
        case 'contains':
            return rows.filter((row) =>
                String(row[dataFilter.column]).includes(
                    String(dataFilter.value)
                )
            )
        case 'notContains':
            return rows.filter(
                (row) =>
                    !String(row[dataFilter.column]).includes(
                        String(dataFilter.value)
                    )
            )
        case 'greaterThan':
            return rows.filter(
                (row) =>
                    Number(row[dataFilter.column]) > Number(dataFilter.value)
            )
        case 'greaterThanOrEqual':
            return rows.filter(
                (row) =>
                    Number(row[dataFilter.column]) >= Number(dataFilter.value)
            )
        case 'lessThan':
            return rows.filter(
                (row) =>
                    Number(row[dataFilter.column]) < Number(dataFilter.value)
            )
        case 'lessThanOrEqual':
            return rows.filter(
                (row) =>
                    Number(row[dataFilter.column]) <= Number(dataFilter.value)
            )
        default:
            throw new Error(`Unknown filter mode: ${dataFilter.mode}`)
    }
}

export const aggregateRowsByColumn = (
    rows: DataRow[],
    agg: ColumnAggregation
): Record<string, unknown>[] => {
    const groups = _.groupBy(rows, agg.groupByColumn)
    const aggregatedRows: Record<string, unknown>[] = []

    for (const groupKey in groups) {
        const groupRows = groups[groupKey]
        const hasNonNumbers = groupRows.some((row) => {
            const value = row[agg.valueColumn]
            return value === null || value === undefined || isNaN(Number(value))
        })

        if (hasNonNumbers) {
            throw new Error(
                `Column '${agg.valueColumn}' contains non-numeric values. All values must be numbers for aggregation.`
            )
        }

        let aggregatedValue: number

        switch (agg.mode) {
            case 'sum':
                aggregatedValue = _.sumBy(groupRows, agg.valueColumn)
                break
            case 'mean':
                aggregatedValue = _.meanBy(groupRows, agg.valueColumn)
                break
            case 'max': {
                const maxRecord = _.maxBy(groupRows, agg.valueColumn)
                aggregatedValue = maxRecord
                    ? Number(maxRecord[agg.valueColumn])
                    : 0
                break
            }
            case 'min': {
                const minRecord = _.minBy(groupRows, agg.valueColumn)
                aggregatedValue = minRecord
                    ? Number(minRecord[agg.valueColumn])
                    : 0

                break
            }
            default:
                throw new Error(`Unknown aggregation mode: ${agg.mode}`)
        }

        aggregatedRows.push({
            [agg.groupByColumn]: groupKey,
            [agg.valueColumn]: aggregatedValue,
        })
    }
    return aggregatedRows
}
