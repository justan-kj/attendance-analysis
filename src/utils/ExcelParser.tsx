import { utils } from 'xlsx'
import type { WorkSheet } from 'xlsx'

export interface ExcelTable {
    workbookName: string
    worksheetName: string
    headers: string[]
    rows: unknown[][]
}

export const parseExcelWorksheet = (
    workbookName: string,
    worksheet: WorkSheet
): ExcelTable => {
    const json = utils.sheet_to_json(worksheet)
    const headers = new Set<string>()
    json.forEach((row) => {
        Object.keys(row as object).forEach((colName) => {
            headers.add(colName)
        })
    })
    return {
        workbookName,
        worksheetName: worksheet.name,
        headers: Array.from(headers),
        rows: json.slice(1).map((row) => Object.values(row as object)),
    }
}
