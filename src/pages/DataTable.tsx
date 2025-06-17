import { Container, Paper } from '@mui/material'
import React from 'react'
import type { WorkSheet } from 'xlsx'
import FileImporter from '../components/FileImporter'
import SheetTable from '../components/SheetTable'

const DataTable: React.FC = () => {
    const [sheetData, setSheetData] = React.useState<WorkSheet | null>(null)

    const handleDataUpload = async (sheet: WorkSheet) => {
        setSheetData(sheet)
    }

    return (
        <Container>
            <FileImporter onSubmit={handleDataUpload} />
            {sheetData && (
                <Paper sx={{ marginTop: 2, p: 3 }}>
                    <SheetTable worksheet={sheetData} />
                </Paper>
            )}
        </Container>
    )
}

export default DataTable
