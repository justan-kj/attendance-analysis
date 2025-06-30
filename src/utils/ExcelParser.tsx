import { utils } from 'xlsx'
import type { WorkSheet } from 'xlsx'

export interface ExcelTable {
    workbookName: string
    worksheetName: string
    headers: string[]
    rows: Record<string, unknown>[]
}

export const parseExcelWorksheet = (
    workbookName: string,
    worksheet: WorkSheet
): ExcelTable => {
    const json = utils.sheet_to_json<Record<string, unknown>>(worksheet)
    if (json.length === 0) {
        return {
            workbookName,
            worksheetName: worksheet.name,
            headers: [],
            rows: [],
        }
    }

    const headers = Object.keys(json[0])

    return {
        workbookName,
        worksheetName: worksheet.name,
        headers,
        rows: json,
    }
}
