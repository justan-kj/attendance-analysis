import React, { useContext, useEffect, useState } from 'react'
import BarChartComponent from '../components/BarChart'
import { DataContext } from '../contexts/DataContext'
import { Container, Stack } from '@mui/material'
import {
    aggregateRowsByColumn,
    filterRowsByColumn,
} from '../utils/DataProcessing'
import type { ColumnAggregation, ColumnFilter } from '../utils/DataProcessing'
import ChartSettings from '../components/ChartSettings'
import NoDataWarning from '../components/NoDataWarning'
import ChartFilters from '../components/ChartFilters'

const BarChartPage: React.FC = () => {
    const context = useContext(DataContext)
    if (!context) {
        throw new Error('DataContext not provided')
    }
    const { data } = context
    const [aggregation, setAggregation] = useState<ColumnAggregation>({
        groupByColumn: 'Year of Course',
        valueColumn: '% Attendance',
        mode: 'mean',
    })

    const [filteredData, setFilteredData] = useState<Record<string, unknown>[]>(
        data?.rows || []
    )

    useEffect(() => {
        setFilteredData(data?.rows || [])
    }, [data])
    const onSubmit = (settings: ColumnAggregation) => {
        setAggregation(settings)
    }

    const onFilterSubmit = (filters: ColumnFilter[]) => {
        const intiialData = data?.rows || []
        console.log('initialData:', intiialData)
        const newData = filters.reduce((d, filter) => {
            console.log('filter:', filter)
            const newFilteredRows = filterRowsByColumn(d, filter)
            console.log('newFilteredRows:', newFilteredRows)
            return newFilteredRows
        }, intiialData)

        console.log('newData:', newData)
        setFilteredData(newData)
    }

    const totals = aggregateRowsByColumn(filteredData || [], aggregation)
    const x_values = totals.map(
        (row) => row[aggregation.groupByColumn] as string
    )
    const y_values = totals.map((row) => row[aggregation.valueColumn] as number)

    return (
        <>
            {data ? (
                <Stack direction={'row'} sx={{ marginTop: 4 }} spacing={2}>
                    <Container sx={{ width: '30%' }}>
                        <ChartSettings
                            onSubmit={onSubmit}
                            headers={data?.headers || []}
                        />
                    </Container>

                    <Stack
                        sx={{
                            marginTop: 4,

                            width: '70%',
                        }}
                        spacing={2}
                    >
                        <BarChartComponent
                            x_values={x_values}
                            x_label={aggregation.groupByColumn}
                            y_values={y_values}
                            y_label={aggregation.valueColumn}
                        />
                        <ChartFilters
                            onSubmit={onFilterSubmit}
                            headers={data?.headers || []}
                        />
                    </Stack>
                </Stack>
            ) : (
                <NoDataWarning />
            )}
        </>
    )
}

export default BarChartPage
