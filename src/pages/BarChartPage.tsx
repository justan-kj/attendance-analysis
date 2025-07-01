import React, { useContext, useState } from 'react'
import BarChartComponent from '../components/Barchart'
import { DataContext } from '../contexts/DataContext'
import { Container, Stack } from '@mui/material'
import { aggregateRowsByColumn } from '../utils/DataProcessing'
import type { ColumnAggregation } from '../utils/DataProcessing'
import ChartSettings from '../components/ChartSettings'

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

    const onSubmit = (settings: ColumnAggregation) => {
        setAggregation(settings)
    }

    const totals = aggregateRowsByColumn(data?.rows || [], aggregation)
    console.log('Totals:', totals)
    const x_values = totals.map(
        (row) => row[aggregation.groupByColumn] as string
    )
    const y_values = totals.map((row) => row[aggregation.valueColumn] as number)

    return (
        <Stack direction={'row'} sx={{ marginTop: 4 }} spacing={2}>
            <Container sx={{ width: '20%' }}>
                <ChartSettings
                    onSubmit={onSubmit}
                    headers={data?.headers || []}
                />
            </Container>

            <Stack
                sx={{
                    marginTop: 4,

                    width: '80%',
                }}
                spacing={2}
            >
                <BarChartComponent
                    x_values={x_values}
                    x_label={aggregation.groupByColumn}
                    y_values={y_values}
                    y_label={aggregation.valueColumn}
                />
            </Stack>
        </Stack>
    )
}

export default BarChartPage
