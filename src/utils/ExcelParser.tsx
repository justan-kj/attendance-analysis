import { utils } from 'xlsx'
import type { WorkSheet } from 'xlsx'
import _ from 'lodash'
import { z } from 'zod'
export interface ExcelTable {
    workbookName: string
    worksheetName: string
    headers: string[]
    rows: DataRow[]
}

export const ExcelRowSchema = z.object({
    User: z.union([z.string(), z.number()]).nullable(),
    'Last Submitted': z.number().nullable(),
    'Last Attendence': z.number().nullable(),
    'Last Attended (AA)': z.number().nullable(),

    '% Attendance': z.number().nullable(),

    '% Submitted': z.number().nullable(),
    'Level of Study': z.string().nullable(),
    'Course Title': z.string().nullable(),
    'Year of Course': z.union([z.string(), z.number()]).nullable(),
    'Registration Status': z.string().nullable(),
    'Attended (AA)': z.number().nullable(),
    'Explained Non Attendances (AA)': z.number().nullable(),
    'Non Attendances (AA)': z.number().nullable(),
    'Attendance Not Recorded (AA)': z.number().nullable(),
    'Academic Advising Sessions': z.number().nullable(),
    Submitted: z.number().nullable(),
    'Explained Non-Submission': z.number().nullable(),
    'Non Submission': z.number().nullable(),
})

export type DataRow = z.infer<typeof ExcelRowSchema> & {
    'Last Date': Date
    [key: string]: any
}

export const parseExcelWorksheet = (
    workbookName: string,
    worksheetName: string,
    worksheet: WorkSheet
): ExcelTable => {
    const json = utils.sheet_to_json<Record<string, unknown>>(worksheet, {
        raw: true,
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

    const dataHeaders = Array.from(
        new Set(json.flatMap((row) => Object.keys(row)))
    )
    const schemaHeaders = Object.keys(ExcelRowSchema.shape)
    const missingHeaders = schemaHeaders.filter(
        (key) => !dataHeaders.includes(key)
    )

    console.log(dataHeaders, schemaHeaders)
    console.log(missingHeaders)
    if (missingHeaders.length > 0) {
        throw new Error(
            `Required columns missing: ${missingHeaders.join(', ')}`
        )
    }

    const validatedRows = json.map((row) => {
        try {
            return ExcelRowSchema.strip().parse(row)
        } catch (error) {
            console.warn(`Row validation failed for row:`, row, error)
            return row
        }
    })

    console.log(validatedRows[0])

    const formattedRows = validatedRows.map((row) => {
        const newRow: DataRow = { ...row }
        Object.keys(row).forEach((key) => {
            if (key.toLowerCase().startsWith('%') && row[key]) {
                newRow[key] = _.round((row[key] as number) * 100, 2)
            }
        })
        const maxDateValue = _.max([
            row['Last Submitted'],
            row['Last Attendence'],
            row['Last Attended (AA)'],
        ])
        if (typeof maxDateValue !== 'number') {
            newRow['Last Date'] = new Date()
        } else {
            newRow['Last Date'] = excelToJsDate(maxDateValue)
        }

        return newRow
    })
    const dataRows = _.sortBy(formattedRows, (row) => row['Last Date'])

    return {
        workbookName,
        worksheetName,
        headers: dataHeaders,
        rows: dataRows,
    }
}

const excelToJsDate = (excelDate: number) => {
    return new Date((excelDate - (25567 + 1)) * 86400 * 1000)
}
