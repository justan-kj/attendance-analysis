import { utils } from 'xlsx'
import type { WorkSheet } from 'xlsx'

export interface ExcelTable {
    workbookName: string
    worksheetName: string
    headers: string[]
    rows: Record<string, unknown>[]
}

const ExcelDateToJSDate = (date: number) => {
    return new Date(Math.round((date - 25569) * 86400 * 1000))
}

export const parseExcelWorksheet = (
    workbookName: string,
    worksheetName: string,
    worksheet: WorkSheet
): ExcelTable => {
    const json = utils.sheet_to_json<Record<string, unknown>>(worksheet)
    if (json.length === 0) {
        return {
            workbookName,
            worksheetName,
            headers: [],
            rows: [],
        }
    }

    const headers = Array.from(new Set(json.flatMap((row) => Object.keys(row))))

    const formattedRows = json.map((row) => {
        const newRow = { ...row }

        Object.keys(row).forEach((key) => {
            if (
                key.toLowerCase().startsWith('last') &&
                typeof row[key] === 'number'
            ) {
                newRow[key] = ExcelDateToJSDate(row[key] as number)
            }
            if (
                key.toLowerCase().startsWith('%') &&
                typeof row[key] === 'number'
            ) {
                newRow[key] = row[key] * 100
            }
        })

        return newRow
    })

    return {
        workbookName,
        worksheetName,
        headers,
        rows: formattedRows,
    }
}
