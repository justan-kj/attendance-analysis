import React, { useState } from 'react'
import type { ChangeEvent } from 'react'
import { read, utils } from 'xlsx'
import type { WorkBook, WorkSheet } from 'xlsx'

const FileImporter: React.FC = () => {
    const [error, setError] = useState<string | null>(null)
    const [workbook, setWorkbook] = useState<WorkBook | null>(null)
    const [selectedSheet, setSelectedSheet] = useState<WorkSheet | null>(null)
    const [__html, setHTML] = React.useState('')

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) {
            return
        }
        try {
            setError(null)
            const data = await file.arrayBuffer()
            const loadedWorkbook = read(data)
            setWorkbook(loadedWorkbook)
            setSelectedSheet(
                loadedWorkbook.Sheets[loadedWorkbook.SheetNames[0]]
            )
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load file')
            console.error('Error importing file:', err)
        }
    }

    const handleSheetChange = async (event: ChangeEvent<HTMLSelectElement>) => {
        const sheetName = event.target.value
        if (workbook && sheetName) {
            const sheet = workbook.Sheets[sheetName]
            setSelectedSheet(sheet)
        }
    }

    const handleSubmit = async () => {
        if (!workbook || !selectedSheet) {
            setError('Please select a file and a sheet first.')
            return
        }
        try {
            const sheetData = utils.sheet_to_html(selectedSheet)
            setHTML(sheetData)
        } catch (err) {
            setError(
                err instanceof Error ? err.message : 'Failed to process sheet'
            )
            console.error('Error processing sheet:', err)
        }
    }

    return (
        <div className="file-importer">
            <div className="file-input-container">
                <label htmlFor="file-upload" className="file-label">
                    Select a file
                </label>
                <input
                    id="file-upload"
                    type="file"
                    accept={'.xlsx'}
                    onChange={handleFileChange}
                    className="file-input"
                />
            </div>
            {workbook && (
                <div className="sheet-selector">
                    <label htmlFor="sheet-select" className="file-label">
                        Select a sheet
                    </label>
                    <select
                        id="sheet-select"
                        value={selectedSheet ? selectedSheet.name : ''}
                        onChange={handleSheetChange}
                    >
                        {workbook.SheetNames.map((name) => (
                            <option key={name} value={name}>
                                {name}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {error && <div className="error-message">{error}</div>}

            <button
                className="submit-button"
                onClick={handleSubmit}
                disabled={!workbook || !selectedSheet}
            >
                Submit
            </button>

            <div dangerouslySetInnerHTML={{ __html }} />
        </div>
    )
}

export default FileImporter
