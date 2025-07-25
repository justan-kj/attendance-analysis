import React, { useContext, useState, useEffect } from 'react'
import LineChartComponent from '../components/Linechart'
import RadarChartComponent from '../components/RadarChart'
import { DataContext } from '../contexts/DataContext'
import { Container, Stack } from '@mui/material'
import AppSelect from '../components/AppSelect'
import {
    aggregateRowsByColumn,
    filterRowsByColumn,
} from '../utils/DataProcessing'
import type { ColumnAggregation, ColumnFilter } from '../utils/DataProcessing'
import NoDataWarning from '../components/NoDataWarning'
import _ from 'lodash'

const StudentDashboard: React.FC = () => {
    const context = useContext(DataContext)
    if (!context) {
        throw new Error('DataContext not provided')
    }
    const { data } = context
    const [filteredData, setFilteredData] = useState<any[]>([])
    const [student_id, setStudentId] = useState<string>('')

    const lineAggregation: ColumnAggregation = {
        groupByColumn: 'Last Attendence',
        valueColumn: '% Attendance',
        mode: 'mean',
    }

    const radarAggregation: ColumnAggregation = {
        groupByColumn: 'Course Code',
        valueColumn: '% Attendance',
        mode: 'mean',
    }

    useEffect(() => {
        if (!data) {
            setFilteredData([])
            return
        }
        const filter: ColumnFilter = {
            column: 'User',
            mode: 'equals',
            value: student_id,
        }
        setFilteredData(filterRowsByColumn(data.rows, filter))
    }, [data, student_id])

    const totals = aggregateRowsByColumn(filteredData || [], lineAggregation)
    const student_ids = Array.from(
        new Set(
            data?.rows.map((row) => {
                return row['User'] as string
            })
        )
    )
    const line_x_values = totals.map((row) => {
        const dateStr = row[lineAggregation.groupByColumn] as string
        if (!dateStr) return ''

        const date = new Date(dateStr)
        return !isNaN(date.getTime()) ? date.toLocaleDateString() : dateStr
    })

    const line_y_values = totals.map((row) => {
        const value = row[lineAggregation.valueColumn] as number
        return isNaN(value) ? 0 : value // Replace NaN with 0 or other default value
    })
    let radarTotals = []
    if (filteredData.length) {
        radarTotals = filteredData
        _.orderBy(radarTotals, ['Last Attendence'], ['asc'])
    }

    const lastRow = radarTotals[0]

    const radar_labels = [
        '% Attendance',
        '% Attendance (AA)',
        '% Attendance (Unexcused)',
        '% Submitted',
    ]

    const radar_values = radar_labels.map((label) => {
        if (!lastRow || !lastRow[label]) {
            if (label === '% Attendance (Unexcused)') {
                return 0
            }
            return 100
        }

        const value = lastRow[label] as number
        return isNaN(value) ? 0 : value // Replace NaN with 0
    })

    return (
        <>
            {data ? (
                <Stack sx={{ marginTop: 4 }} spacing={2}>
                    <AppSelect
                        onChange={(e) => setStudentId(e)}
                        label="Select Student"
                        initialValue={student_id}
                        menuItems={student_ids}
                        menuLabels={student_ids}
                    />
                    <Stack
                        sx={{
                            marginTop: 4,

                            width: '80%',
                        }}
                        spacing={2}
                        direction={'row'}
                    >
                        {' '}
                        <RadarChartComponent
                            data={radar_values}
                            labels={radar_labels}
                            max_value={100}
                            title={`Latest Attendence Metrics for ${student_id}`}
                        />
                        <LineChartComponent
                            x_values={line_x_values}
                            x_label={'Date'}
                            y_values={line_y_values}
                            y_label={lineAggregation.valueColumn}
                        />
                    </Stack>
                </Stack>
            ) : (
                <NoDataWarning />
            )}
        </>
    )
}

export default StudentDashboard
