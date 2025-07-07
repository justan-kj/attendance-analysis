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
import type { ColumnAggregation } from '../utils/DataProcessing'

export interface ChartFiltersProps {
    onSubmit: (settings: ColumnAggregation) => void
    headers: string[]
}

const ChartFilters: React.FC<ChartFiltersProps> = ({ onSubmit, headers }) => {
    const [filters, setFilters] = useState<string>('Year of Course')

    const handleSubmit = () => {}
    return (
        <Paper
            sx={{
                padding: 3,
            }}
        >
            <Stack spacing={4}>
                <Typography variant="h6" gutterBottom>
                    Chart Filters
                </Typography>
                <Stack direction={'row'} spacing={1}></Stack>

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

export default ChartFilters
