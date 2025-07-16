import React, { useState } from 'react'
import { Paper, TextField, Stack, Button, Typography } from '@mui/material'
import type { ColumnFilter, FilterMode } from '../utils/DataProcessing'
import AppSelect from './AppSelect'
import { filterLabels } from '../utils/DataProcessing'
import ClearIcon from '@mui/icons-material/Clear'
export interface ChartFiltersProps {
    onSubmit: (filters: ColumnFilter[]) => void
    headers: string[]
}

const ChartFilters: React.FC<ChartFiltersProps> = ({ onSubmit, headers }) => {
    const [filters, setFilters] = useState<ColumnFilter[]>([])

    const filterModeItems = Object.keys(filterLabels)
    const filterModeLabels = Object.values(filterLabels)

    const onFilterChange = (
        index: number,
        type: string,
        value: string | number | FilterMode
    ) => {
        if (!filters[index]) return
        const filter = {
            ...filters[index],
            [type]: value,
        }

        setFilters((prevFilters) => {
            const newFilters = [...prevFilters]
            newFilters[index] = filter
            return newFilters
        })
    }

    const createNewFilter = () => {
        const newFilter = {
            column: '',
            mode: filterModeItems[0] as FilterMode,
            value: '',
        }

        setFilters((prevFilters) => [...prevFilters, newFilter])
    }

    const handleApplyFilters = (filters: ColumnFilter[]) => {
        if (filters.length === 0) {
            console.warn('No filters to apply')
            return
        }
        if (filters.some((f) => f.column == '' || f.value == '')) {
            console.warn('Some filters are incomplete')
            return
        }

        onSubmit(filters)
    }

    return (
        <Paper
            sx={{
                padding: 3,
            }}
        >
            <Stack spacing={2}>
                <Typography variant="h6" gutterBottom>
                    Chart Filters
                </Typography>

                {filters.map((_, index) => (
                    <Stack key={index} direction={'row'} spacing={1}>
                        <AppSelect
                            initialValue={''}
                            menuItems={headers}
                            label="Field"
                            onChange={onFilterChange.bind(
                                null,
                                index,
                                'column'
                            )}
                        />
                        <AppSelect
                            initialValue={filterModeItems[0]}
                            menuItems={filterModeItems}
                            menuLabels={filterModeLabels}
                            label=""
                            onChange={onFilterChange.bind(null, index, 'mode')}
                        />
                        <TextField
                            label="Value"
                            variant="outlined"
                            value={filters[index]?.value || ''}
                            onChange={(e) =>
                                onFilterChange(index, 'value', e.target.value)
                            }
                            fullWidth
                        />
                        <Button
                            variant="text"
                            color="warning"
                            onClick={() => {
                                setFilters((prevFilters) =>
                                    prevFilters.filter((_, i) => i !== index)
                                )
                            }}
                            sx={{
                                alignSelf: 'center',
                                padding: 0,
                                minWidth: 'unset',
                            }}
                        >
                            <ClearIcon />
                        </Button>
                    </Stack>
                ))}

                <Button
                    variant="outlined"
                    color="primary"
                    onClick={createNewFilter}
                    sx={{ marginTop: 2 }}
                >
                    New Filter
                </Button>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleApplyFilters(filters)}
                    sx={{ marginTop: 2 }}
                >
                    Apply Filters
                </Button>
            </Stack>
        </Paper>
    )
}

export default ChartFilters
