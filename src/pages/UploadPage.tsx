import { Stack, Typography, Button } from '@mui/material'
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
    const { data, setData, saveData, clearSavedData } = context

    const handleDataUpload = async (
        filename: string,
        sheetname: string,
        sheet: WorkSheet
    ) => {
        const data = parseExcelWorksheet(filename, sheetname, sheet)
        setData(data)
        saveData(data)
    }

    const handleClearData = () => {
        clearSavedData()
    }

    return (
        <>
            {data ? (
                <Stack sx={{ marginTop: 6 }} spacing={1} alignItems="center">
                    <Typography variant="h5">Data Already Uploaded</Typography>
                    <Typography variant="body1">
                        {data.workbookName + ' (' + data.worksheetName + ')'}
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleClearData}
                        sx={{ margin: 'auto' }}
                    >
                        Upload New Data
                    </Button>
                </Stack>
            ) : (
                <FileImporter onSubmit={handleDataUpload} />
            )}
        </>
    )
}

export default UploadPage
