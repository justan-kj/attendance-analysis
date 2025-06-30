import { Container } from '@mui/material'
import React, { useContext } from 'react'
import type { WorkSheet } from 'xlsx'
import FileImporter from '../components/FileImporter'
import { DataContext } from '../contexts/DataContext'

const Upload: React.FC = () => {
    const context = useContext(DataContext)
    if (!context) {
        throw new Error('DataContext not provided')
    }
    const { data, setData, saveData } = context

    const handleDataUpload = async (sheet: WorkSheet) => {
        setData(sheet)
        saveData(sheet)
    }

    return (
        <Container sx={{ marginTop: 2, padding: 3 }}>
            <FileImporter onSubmit={handleDataUpload} />
        </Container>
    )
}

export default Upload
