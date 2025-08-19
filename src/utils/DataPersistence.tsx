import type { DataRow, ExcelTable } from './ExcelParser'
import { compressToUTF16, decompressFromUTF16 } from 'lz-string'
import { ExcelRowSchema } from './ExcelParser'

export const saveDataset = (data: ExcelTable): void => {
    const dataRows = data.rows
    const cleanedData = dataRows.map((row) => {
        const cleanedRow: DataRow = { ...row }
        Object.keys(cleanedRow).forEach((key) => {
            const typedKey = key as keyof DataRow
            if (
                cleanedRow[typedKey] === null ||
                cleanedRow[typedKey] === undefined
            ) {
                delete cleanedRow[typedKey]
            }
        })
        return cleanedRow
    })
    const savedTable = {
        workbookName: data.workbookName,
        worksheetName: data.worksheetName,
        headers: data.headers,
        rows: cleanedData,
    }
    const compressedData = compressToUTF16(JSON.stringify(savedTable))
    localStorage.setItem('savedData', compressedData)
}

export const loadDataset = (): ExcelTable | null => {
    const compressedData = localStorage.getItem('savedData')
    if (!compressedData) return null

    const jsonData = JSON.parse(decompressFromUTF16(compressedData))
    const schemaKeys = Object.keys(ExcelRowSchema.shape)
    const restoredRows = jsonData.rows.map((row: Partial<DataRow>) => {
        const restoredRow = { ...row }
        schemaKeys.forEach((key) => {
            if (!(key in restoredRow)) {
                restoredRow[key as keyof DataRow] = null
            }
        })

        if (!('Last Date' in restoredRow)) {
            restoredRow['Last Date'] = new Date()
        }

        return restoredRow
    })
    jsonData.rows = restoredRows

    return jsonData as ExcelTable
}
