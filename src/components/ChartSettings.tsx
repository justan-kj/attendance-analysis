import React, { useState } from 'react'
import {
    Paper,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Stack,
    Button,
    Typography,
} from '@mui/material'
import type {
    AggregationMode,
    ColumnAggregation,
} from '../utils/DataProcessing'

export interface ChartSettingsProps {
    onSubmit: (settings: ColumnAggregation) => void
    headers: string[]
}

const ChartSettings: React.FC<ChartSettingsProps> = ({ onSubmit, headers }) => {
    const [groupByColumn, setGroupByColumn] = useState<string>('Year of Course')
    const [valueColumn, setValueColumn] = useState<string>('% Attendance')
    const [mode, setMode] = useState<AggregationMode>('mean')

    const handleSubmit = () => {
        onSubmit({
            groupByColumn,
            valueColumn,
            mode,
        })
    }
    return (
        <Paper
            sx={{
                padding: 3,
            }}
        >
            <Stack spacing={4}>
                <Typography variant="h6" gutterBottom>
                    Chart Settings
                </Typography>
                <FormControl
                    fullWidth
                    sx={{
                        margin: 2,
                    }}
                >
                    <InputLabel id="group-select-label">
                        Group Column
                    </InputLabel>
                    <Select
                        labelId="group-select-label"
                        id="group-select"
                        value={groupByColumn}
                        label="Group Column"
                        onChange={(e) => setGroupByColumn(e.target.value)}
                    >
                        {headers.map((header) => (
                            <MenuItem key={header} value={header}>
                                {header}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel id="value-select-label">
                        Value Column
                    </InputLabel>
                    <Select
                        labelId="value-select-label"
                        id="value-select"
                        value={valueColumn}
                        label="Value Column"
                        onChange={(e) => setValueColumn(e.target.value)}
                    >
                        {headers.map((header) => (
                            <MenuItem key={header} value={header}>
                                {header}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel id="mode-select-label">Aggregation</InputLabel>
                    <Select
                        labelId="dmode-select-label"
                        id="mode-select"
                        value={mode}
                        label="Aggregation"
                        onChange={(e) => setMode(e.target.value)}
                    >
                        <MenuItem value={'sum'}>Sum</MenuItem>
                        <MenuItem value={'mean'}>Mean</MenuItem>
                        <MenuItem value={'max'}>Max</MenuItem>
                        <MenuItem value={'min'}>Min</MenuItem>
                    </Select>
                </FormControl>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    sx={{ marginTop: 2 }}
                >
                    Apply
                </Button>
            </Stack>
        </Paper>
    )
}

export default ChartSettings
