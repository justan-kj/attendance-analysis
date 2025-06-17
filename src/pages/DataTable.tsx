import { Container } from '@mui/material'
import React from 'react'
import type { WorkSheet } from 'xlsx'
import FileImporter from '../components/FileImporter'

const DataTable: React.FC = () => {
    const [sheetData, setSheetData] = React.useState<WorkSheet | null>(null)

    const handleDataUpload = async (sheet: WorkSheet) => {
        setSheetData(sheet)
    }

    return (
        <Container>
            <FileImporter onSubmit={handleDataUpload} />
            {sheetData && (
                <Container>{JSON.stringify(sheetData, null, 2)}</Container>
            )}
        </Container>
    )
}

export default DataTable
