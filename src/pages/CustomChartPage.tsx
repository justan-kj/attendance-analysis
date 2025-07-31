import React, { useEffect, useState } from 'react'
import BarChartComponent from '../components/BarChart'
import LineChartComponent from '../components/Linechart'
import { useData } from '../hook/useData'
import { Stack } from '@mui/material'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import {
    aggregateRowsByColumn,
    filterRowsByColumn,
} from '../utils/DataProcessing'
import type { ColumnAggregation, ColumnFilter } from '../utils/DataProcessing'
import ChartSettings from '../components/ChartSettings'
import NoDataWarning from '../components/NoDataWarning'
import ChartFilters from '../components/ChartFilters'
import type { DataRow } from '../utils/ExcelParser'

const CustomChartPage: React.FC = () => {
    const { data, headers } = useData()
    const [aggregation, setAggregation] = useState<ColumnAggregation>({
        groupByColumn: 'Year of Course',
        valueColumn: '% Attendance',
        mode: 'mean',
    })
    const [chartType, setChartType] = useState('bar')

    const [filteredData, setFilteredData] = useState<DataRow[]>(data)

    useEffect(() => {
        setFilteredData(data)
    }, [data])
    const onSubmit = (settings: ColumnAggregation) => {
        setAggregation(settings)
    }

    const onFilter = (filters: ColumnFilter[]) => {
        const initialData = data
        const newData = filters.reduce((d, filter) => {
            const newFilteredRows = filterRowsByColumn(d, filter)
            return newFilteredRows
        }, initialData)
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
                <Stack direction={'row'} sx={{ padding: 2 }} spacing={2}>
                    <Stack
                        sx={{
                            flex: 3,
                        }}
                        spacing={2}
                    >
                        <Tabs
                            value={chartType}
                            onChange={(_, value) => setChartType(value)}
                        >
                            <Tab label="Bar Chart" value="bar" />
                            <Tab label="Line Chart" value="line" />
                        </Tabs>
                        {chartType == 'bar' && (
                            <BarChartComponent
                                x_values={x_values}
                                x_label={aggregation.groupByColumn}
                                y_values={y_values}
                                y_label={aggregation.valueColumn}
                            />
                        )}
                        {chartType == 'line' && (
                            <LineChartComponent
                                x_values={x_values}
                                x_label={aggregation.groupByColumn}
                                y_values={y_values}
                                y_label={aggregation.valueColumn}
                            />
                        )}
                    </Stack>
                    <Stack spacing={2} sx={{ flex: 1 }}>
                        <ChartSettings onSubmit={onSubmit} headers={headers} />
                        <ChartFilters onSubmit={onFilter} headers={headers} />
                    </Stack>
                </Stack>
            ) : (
                <NoDataWarning />
            )}
        </>
    )
}

export default CustomChartPage
