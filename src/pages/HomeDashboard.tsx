import React, { useState, useEffect } from 'react'
import LineChartComponent from '../components/LineChart'
import PieChartComponent from '../components/PieChart'
import { Stack, Typography, Paper } from '@mui/material'
import StudentSelector from '../components/StudentSelector'
import {
    aggregateRowsByColumn,
    filterRowsByColumn,
} from '../utils/DataProcessing'
import type { ColumnFilter } from '../utils/DataProcessing'
import type { DataRow } from '../utils/ExcelParser'
import NoDataWarning from '../components/NoDataWarning'
import _, { max } from 'lodash'
import type { PieValueType, ScatterValueType } from '@mui/x-charts'
import { useData } from '../hook/useData'
import StudentSummary from '../components/StudentSummary'
import ScatterChartComponent from '../components/ScatterChart'
import BarChartComponent from '../components/BarChart'

const getColor = (attendanceRate: number) => {
    if (attendanceRate > 70) {
        return 'success.main'
    } else if (attendanceRate > 50) {
        return 'warning.main'
    } else {
        return 'error.main'
    }
}

const HomeDashboard: React.FC = () => {
    const { data } = useData()
    const [filteredData, setFilteredData] = useState<DataRow[]>([])

    useEffect(() => {
        if (!data) {
            return
        }
        const latestData = aggregateRowsByColumn(
            data,
            [
                'User',
                'Year of Course',
                'Course Title',
                'Registration Status',
                'Level of Study',
            ],
            [
                '% Attendance',
                '% Attendance (Unexcused)',
                '% Submitted',
                'Last Date',
                'Academic Advising Sessions',
                'Attended (AA)',
                'Explained Non Attendances (AA)',
                'Non Attendances (AA)',
                'Attendance Not Recorded (AA)',
                'Explained Non-Submission',
                'Non Submission',
                'Submitted',
                'Attendance Not Recorded (AA)',
            ],
            [
                'latest',
                'latest',
                'latest',
                'latest',
                'max',
                'max',
                'max',
                'max',
                'max',
                'max',
                'max',
                'max',
                'max',
            ]
        )
        const latestDataWithDates = latestData.flatMap((row) =>
            row['Last Date']
                ? [
                      {
                          ...row,
                          'Last Date': new Date(row['Last Date'] as string),
                      },
                  ]
                : []
        )

        setFilteredData(latestDataWithDates)
    }, [data])

    const courseData = aggregateRowsByColumn(
        filteredData,
        ['Course Title'],
        ['% Attendance', '% Attendance (Unexcused)', '% Submitted'],
        ['mean', 'mean', 'mean']
    )

    const attendanceData = courseData
        .sort((a, b) => {
            return (a['% Attendance'] as number) - (b['% Attendance'] as number)
        })
        .slice(0, 10)

    const submissionData = courseData
        .sort((a, b) => {
            return (a['% Submitted'] as number) - (b['% Submitted'] as number)
        })
        .slice(0, 10)

    const attendanceRate =
        courseData.reduce(
            (acc, row) => acc + ((row['% Attendance'] as number) || 0),
            0
        ) / courseData.length

    const attendanceUnexcusedRate =
        courseData.reduce(
            (acc, row) => acc + ((row['% Submitted'] as number) || 0),
            0
        ) / courseData.length

    const countData = filteredData.reduce(
        (acc, row) => {
            acc['Submitted'] += (row['Submitted'] as number) || 0
            acc['Explained Non-Submission'] +=
                (row['Explained Non-Submission'] as number) || 0
            acc['Non Submission'] += (row['Non Submission'] as number) || 0
            acc['Attended (AA)'] += (row['Attended (AA)'] as number) || 0
            acc['Explained Non Attendances (AA)'] +=
                (row['Explained Non Attendances (AA)'] as number) || 0
            acc['Non Attendances (AA)'] +=
                (row['Non Attendances (AA)'] as number) || 0
            acc['Attendance Not Recorded (AA)'] +=
                (row['Attendance Not Recorded (AA)'] as number) || 0
            acc['Attendance Not Recorded (AA)'] +=
                (row['Attendance Not Recorded (AA)'] as number) || 0
            return acc
        },
        {
            Submitted: 0,
            'Explained Non-Submission': 0,
            'Non Submission': 0,
            'Attended (AA)': 0,
            'Explained Non Attendances (AA)': 0,
            'Non Attendances (AA)': 0,
            'Attendance Not Recorded (AA)': 0,
        }
    )

    console.log('Filtered Data:', countData)

    const getPieSeries = (keys: string[]) => {
        const series = keys.map((key, index) => {
            if ((countData[key] as number) > 0) {
                return {
                    id: `${index}`,
                    value: countData[key],
                    label: key,
                }
            }
        })
        return series as PieValueType[]
    }

    return (
        <>
            {data ? (
                <Stack
                    sx={{
                        p: 5,
                        height: '90vh',
                    }}
                    spacing={4}
                    direction={'row'}
                    alignItems={'stretch'}
                >
                    {' '}
                    <Stack spacing={4} flex={1}>
                        <Stack spacing={4} flex={1} direction={'row'}>
                            <Paper
                                sx={{
                                    padding: 3,
                                }}
                            >
                                <Stack spacing={2} height={'100%'}>
                                    <Typography variant="h6">
                                        Average Attendance Rate
                                    </Typography>
                                    <Typography
                                        variant="h3"
                                        fontWeight="bold"
                                        flex={1}
                                        textAlign={'center'}
                                        color={getColor(attendanceRate)}
                                    >
                                        {attendanceRate.toFixed(0)}%
                                    </Typography>{' '}
                                </Stack>
                            </Paper>{' '}
                            <Paper
                                sx={{
                                    padding: 3,
                                }}
                            >
                                <Stack spacing={2} height={'100%'}>
                                    <Typography variant="h6">
                                        Average Submission Rate
                                    </Typography>
                                    <Typography
                                        variant="h3"
                                        fontWeight="bold"
                                        flex={1}
                                        textAlign={'center'}
                                        color={getColor(
                                            attendanceUnexcusedRate
                                        )}
                                    >
                                        {attendanceUnexcusedRate.toFixed(0)}%
                                    </Typography>{' '}
                                </Stack>
                            </Paper>{' '}
                        </Stack>

                        <PieChartComponent
                            series_data={getPieSeries([
                                'Submitted',
                                'Explained Non-Submission',
                                'Non Submission',
                            ])}
                            sx={{ height: '75vh', padding: 3 }}
                            title="Assessment Submission Status"
                        />
                        <PieChartComponent
                            series_data={getPieSeries([
                                'Attended (AA)',
                                'Explained Non Attendances (AA)',
                                'Non Attendances (AA)',
                                'Attendance Not Recorded (AA)',
                            ])}
                            sx={{ height: '75vh', padding: 3 }}
                            title="Academic Advising Status"
                        />
                    </Stack>
                    <BarChartComponent
                        x_values={attendanceData.map(
                            (row) => row['Course Title'] as string
                        )}
                        x_label={'Course Title'}
                        y_values={attendanceData.map(
                            (row) => row['% Attendance'] as number
                        )}
                        y_label={'% Attendance'}
                        sx={{ padding: 3, flex: 1, height: '75vh' }}
                    />
                    <BarChartComponent
                        x_values={submissionData.map(
                            (row) => row['Course Title'] as string
                        )}
                        x_label={'Course Title'}
                        y_values={submissionData.map(
                            (row) => row['% Submitted'] as number
                        )}
                        y_label={'% Submitted'}
                        sx={{ padding: 3, flex: 1, height: '75vh' }}
                    />
                </Stack>
            ) : (
                <NoDataWarning />
            )}
        </>
    )
}

export default HomeDashboard
