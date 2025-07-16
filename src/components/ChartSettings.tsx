import React, { useState } from 'react'
import { Paper, Button, Typography, Stack } from '@mui/material'
import type {
    ColumnAggregation,
    AggregationMode,
} from '../utils/DataProcessing'
import AppSelect from './AppSelect'

export interface ChartSettingsProps {
    onSubmit: (settings: ColumnAggregation) => void
    headers: string[]
}

const ChartSettings: React.FC<ChartSettingsProps> = ({ onSubmit, headers }) => {
    const [groupByColumn, setGroupByColumn] = useState<string>('Year of Course')
    const [valueColumn, setValueColumn] = useState<string>('% Attendance')
    const [mode, setMode] = useState<string>('mean')

    const handleSubmit = () => {
        onSubmit({
            groupByColumn,
            valueColumn,
            mode: mode as AggregationMode,
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
                <AppSelect
                    initialValue={groupByColumn}
                    menuItems={headers}
                    label="Group Column"
                    onChange={setGroupByColumn}
                />
                <AppSelect
                    initialValue={valueColumn}
                    menuItems={headers}
                    label="Value Column"
                    onChange={setValueColumn}
                />
                <AppSelect
                    initialValue={mode}
                    menuItems={['sum', 'mean', 'max', 'min']}
                    label="Aggregation"
                    onChange={setMode}
                />

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
