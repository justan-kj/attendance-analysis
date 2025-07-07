import _ from 'lodash'

type FilterMode =
    | 'equals'
    | 'notEquals'
    | 'contains'
    | 'notContains'
    | 'greaterThan'
    | 'greaterThanOrEqual'
    | 'lessThan'
    | 'lessThanOrEqual'

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
    rows: Record<string, unknown>[],
    dataFilter: ColumnFilter
): Record<string, unknown>[] => {
    switch (dataFilter.mode) {
        case 'equals':
            return rows.filter((row) => {
                if (row[dataFilter.column] === dataFilter.value) {
                    console.log(
                        row[dataFilter.column],
                        dataFilter.value as string
                    )
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
    rows: Record<string, unknown>[],
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
