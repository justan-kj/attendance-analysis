import { utils } from 'xlsx'
import type { WorkSheet } from 'xlsx'
import _ from 'lodash'
export interface ExcelTable {
    workbookName: string
    worksheetName: string
    headers: string[]
    rows: Record<string, unknown>[]
}

export interface DataRow {
    User: string
    'Last Submitted': Date | undefined
    'Last Attendence': Date | undefined
    'Last Attended (AA)': Date | undefined
    '% Attendance': number | undefined
    'Level of Study': string | undefined
    'Course Title': string | undefined
    'Year of Course': number | undefined
    'Registration Status': string | undefined
    'Academic Advising Sessions': number | undefined
    'Attended (AA)': number | undefined
    'Explained Non Attendances (AA)': number | undefined
    'Non Attendances (AA)': number | undefined
    'Attendance Not Recorded (AA)': number | undefined
    Assessments: number | undefined
    Submitted: number | undefined
    'Explained Non-Submission': number | undefined
    'Non-Submission': number | undefined
    [key: string]: string | number | Date | undefined
}

export const parseExcelWorksheet = (
    workbookName: string,
    worksheetName: string,
    worksheet: WorkSheet
): ExcelTable => {
    const json = utils.sheet_to_json<Record<string, unknown>>(worksheet, {
        raw: false,
        dateNF: 'yyyy-mm-dd',
        defval: null,
        blankrows: false,
    })
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
                key.toLowerCase().startsWith('%') &&
                typeof row[key] === 'number'
            ) {
                newRow[key] = row[key] * 100
            }
        })
        newRow['Last Date'] = _.max([
            row['Last Submitted'],
            row['Last Attendence'],
            row['Last Attended (AA)'],
        ])
        return newRow
    })
    console.log('Formatted Rows:', formattedRows)
    const dataRows = _.sortBy(formattedRows, (row) => row['Last Date'])

    return {
        workbookName,
        worksheetName,
        headers,
        rows: dataRows,
    }
}
