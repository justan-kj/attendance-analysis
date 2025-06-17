import React, { useState } from 'react'
import type { ChangeEvent } from 'react'
import { read } from 'xlsx'
import type { WorkBook, WorkSheet } from 'xlsx'
import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Typography,
    Alert,
    Stack,
} from '@mui/material'
import UploadFileIcon from '@mui/icons-material/UploadFile'

interface FileImporterProps {
    onSubmit?: (data: WorkSheet) => void
}

const FileImporter: React.FC<FileImporterProps> = ({ onSubmit }) => {
    const [error, setError] = useState<string | null>(null)
    const [file, setFile] = useState<File | null>(null)
    const [workbook, setWorkbook] = useState<WorkBook | null>(null)
    const [selectedSheetname, setSelectedSheetname] = useState<string | null>(
        null
    )

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) {
            return
        }
        setFile(file)
        try {
            setError(null)
            const data = await file.arrayBuffer()
            const loadedWorkbook = read(data)
            setWorkbook(loadedWorkbook)
            setSelectedSheetname(loadedWorkbook.SheetNames[0])
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load file')
            console.error('Error importing file:', err)
        }
    }

    const handleSubmit = async () => {
        if (!workbook || !selectedSheetname) {
            setError('Please select a file and a sheet first.')
            return
        }
        try {
            if (onSubmit) {
                onSubmit(workbook.Sheets[selectedSheetname])
            }
        } catch (err) {
            setError(
                err instanceof Error ? err.message : 'Failed to process sheet'
            )
            console.error('Error processing sheet:', err)
        }
    }

    return (
        <Paper
            className="max-w-md"
            elevation={3}
            sx={{
                p: 3,
                mx: 'auto',
                mt: 3,
            }}
        >
            <Stack spacing={3} sx={{ mt: 3 }}>
                <Stack direction="row" spacing={1} alignItems="center">
                    <Button
                        variant="contained"
                        component="label"
                        startIcon={<UploadFileIcon />}
                        sx={{
                            minWidth: 'fit-content',
                        }}
                    >
                        Choose File
                        <input
                            type="file"
                            accept={'.xlsx'}
                            onChange={handleFileChange}
                            hidden
                        />
                    </Button>
                    <Typography variant="body1" noWrap={true}>
                        {file ? file.name : 'No file selected'}
                    </Typography>
                </Stack>

                {workbook && (
                    <FormControl fullWidth variant="outlined">
                        <InputLabel id="sheet-select-label">Sheet</InputLabel>
                        <Select
                            label="Sheet"
                            value={selectedSheetname ? selectedSheetname : ''}
                            onChange={(e) =>
                                setSelectedSheetname(e.target.value)
                            }
                        >
                            {workbook.SheetNames.map((sheetName) => (
                                <MenuItem value={sheetName}>
                                    {sheetName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                )}

                {error && <Alert severity="error">{error}</Alert>}

                <Button
                    className="submit-button"
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={!workbook || !selectedSheetname}
                >
                    Upload
                </Button>
            </Stack>
        </Paper>
    )
}

export default FileImporter
