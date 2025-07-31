import React, { useContext, useState, useMemo } from 'react'
import LineChartComponent from '../components/Linechart'
import { DataContext } from '../contexts/DataContext'
import { Container, Stack } from '@mui/material'
import {
    aggregateRowsByColumn,
    filterRowsByColumn,
} from '../utils/DataProcessing'
import type { ColumnAggregation, ColumnFilter } from '../utils/DataProcessing'
import NoDataWarning from '../components/NoDataWarning'
import AppSelect from '../components/AppSelect'

const Dashboard: React.FC = () => {
    const context = useContext(DataContext)
    if (!context) {
        throw new Error('DataContext not provided')
    }
    const { data } = context

    const aggregation: ColumnAggregation = {
        groupByColumn: 'User',
        valueColumn: '% Attendance',
        mode: 'mean',
    }

    const aggregatedData = aggregateRowsByColumn(data?.rows || [], aggregation)

    const [filteredData, setFilteredData] = useState(aggregatedData)

    const handleFilterChange = (filterValue: string) => {
        const filter: ColumnFilter = {
            column: aggregation.groupByColumn,
            value: filterValue as string,
            mode: 'equals',
        }
        const newData = filterRowsByColumn(aggregatedData, filter)
        setFilteredData(newData)
    }

    const users = useMemo(() => {
        if (!data?.rows) return []

        return data.rows.map((row) => row[aggregation.groupByColumn] as string)
    }, [data?.rows, aggregation.groupByColumn])

    const x_values = filteredData.map(
        (row) => row[aggregation.groupByColumn] as string
    )
    const y_values = filteredData.map(
        (row) => row[aggregation.valueColumn] as number
    )

    return (
        <>
            {data ? (
                <Stack direction={'row'} sx={{ marginTop: 4 }} spacing={2}>
                    <Container sx={{ width: '20%' }}>
                        <AppSelect
                            menuItems={users}
                            label="Filter by User"
                            onChange={handleFilterChange}
                        />
                    </Container>

                    <Stack
                        sx={{
                            marginTop: 4,

                            width: '80%',
                        }}
                        spacing={2}
                    >
                        <LineChartComponent
                            x_values={x_values}
                            x_label={aggregation.groupByColumn}
                            y_values={y_values}
                            y_label={aggregation.valueColumn}
                        />
                    </Stack>
                </Stack>
            ) : (
                <NoDataWarning />
            )}
        </>
    )
}

export default Dashboard
