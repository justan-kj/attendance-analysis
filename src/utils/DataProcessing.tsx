export type FilterMode =
    | 'equals'
    | 'notEquals'
    | 'contains'
    | 'notContains'
    | 'greaterThan'
    | 'greaterThanOrEqual'
    | 'lessThan'
    | 'lessThanOrEqual'

export const filterRowsByColumn = (
    rows: Record<string, unknown>[],
    column: string,
    mode: FilterMode,
    value: number | string
): Record<string, unknown>[] => {
    switch (mode) {
        case 'equals':
            return rows.filter((row) => row[column] === value)
        case 'notEquals':
            return rows.filter((row) => row[column] !== value)
        case 'contains':
            return rows.filter((row) =>
                String(row[column]).includes(String(value))
            )
        case 'notContains':
            return rows.filter(
                (row) => !String(row[column]).includes(String(value))
            )
        case 'greaterThan':
            return rows.filter((row) => Number(row[column]) > Number(value))
        case 'greaterThanOrEqual':
            return rows.filter((row) => Number(row[column]) >= Number(value))
        case 'lessThan':
            return rows.filter((row) => Number(row[column]) < Number(value))
        case 'lessThanOrEqual':
            return rows.filter((row) => Number(row[column]) <= Number(value))
        default:
            throw new Error(`Unknown filter mode: ${mode}`)
    }
}
