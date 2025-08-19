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

export type AggregationMode = 'sum' | 'mean' | 'max' | 'min' | 'latest'

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
    groupByColumns: string[],
    valueColumns: string[],
    aggregationModes: AggregationMode[]
): DataRow[] => {
    if (
        !rows ||
        !groupByColumns ||
        !valueColumns ||
        !aggregationModes ||
        rows.length === 0 ||
        groupByColumns.length === 0 ||
        valueColumns.length === 0 ||
        aggregationModes.length === 0
    ) {
        return []
    }
    const groups = _.groupBy(rows, (row) =>
        groupByColumns.map((col) => String(row[col])).join('|')
    )
    const aggregatedRows: DataRow[] = []

    for (const column of [...groupByColumns, ...valueColumns]) {
        if (!Object.keys(rows[0]).includes(column)) {
            throw new Error(`Column '${column}' does not exist in rows`)
        }
    }
    if (valueColumns.length !== aggregationModes.length) {
        throw new Error(
            'No. of value columns must match no. of aggregation modes'
        )
    }

    for (const groupKey in groups) {
        const groupRows = groups[groupKey]
        const newRow: DataRow = {} as DataRow
        groupByColumns.forEach((column) => {
            newRow[column] = groupRows[0][column]
        })

        for (let i = 0; i < valueColumns.length; i++) {
            let aggregatedValue: number | string | Date

            switch (aggregationModes[i]) {
                case 'sum':
                    aggregatedValue = _.sumBy(groupRows, (row) =>
                        Number(row[valueColumns[i]])
                    )

                    break
                case 'mean':
                    aggregatedValue = _.meanBy(groupRows, (row) =>
                        Number(row[valueColumns[i]])
                    )
                    break
                case 'max': {
                    const maxRecord = _.maxBy(groupRows, (row) =>
                        Number(row[valueColumns[i]])
                    )
                    aggregatedValue = maxRecord
                        ? Number(maxRecord[valueColumns[i]])
                        : 0
                    break
                }
                case 'min': {
                    const minRecord = _.minBy(groupRows, (row) =>
                        Number(row[valueColumns[i]])
                    )
                    aggregatedValue = minRecord
                        ? Number(minRecord[valueColumns[i]])
                        : 0

                    break
                }
                case 'latest': {
                    const latestRecord = groupRows.sort((a, b) => {
                        if (!a['Last Date'] || !b['Last Date']) {
                            return 0
                        }
                        return (
                            new Date(b['Last Date']).getTime() -
                            new Date(a['Last Date']).getTime()
                        )
                    })[0]

                    aggregatedValue = latestRecord
                        ? latestRecord[valueColumns[i]] || 0
                        : 0
                    break
                }

                default:
                    throw new Error(
                        `Unknown aggregation mode: ${aggregationModes[i]}`
                    )
            }

            newRow[valueColumns[i]] = aggregatedValue
        }

        aggregatedRows.push(newRow)
    }
    return aggregatedRows
}

export const findPercentRankByColumn = (
    rows: DataRow[],
    column: keyof DataRow,
    value: number
): number => {
    const sortedRows = _.sortBy(rows, (row) => row[column] || 0)
    if (sortedRows.length === 0) {
        return 0
    }
    const targetRows = sortedRows.filter(
        (row) => ((row[column] || 0) as number) < value
    )
    if (targetRows.length === 0) {
        return 0
    }

    return targetRows.length / sortedRows.length
}
