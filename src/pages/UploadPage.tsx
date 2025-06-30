import { Container } from '@mui/material'
import React, { useContext } from 'react'
import type { WorkSheet } from 'xlsx'
import FileImporter from '../components/FileImporter'
import { parseExcelWorksheet } from '../utils/ExcelParser'
import { DataContext } from '../contexts/DataContext'

const UploadPage: React.FC = () => {
    const context = useContext(DataContext)
    if (!context) {
        throw new Error('DataContext not provided')
    }
    const { setData, saveData } = context

    const handleDataUpload = async (filename: string, sheet: WorkSheet) => {
        const data = parseExcelWorksheet(filename, sheet)
        setData(data)
        saveData(data)
    }

    return (
        <Container sx={{ marginTop: 2, padding: 3 }}>
            <FileImporter onSubmit={handleDataUpload} />
        </Container>
    )
}

export default UploadPage
