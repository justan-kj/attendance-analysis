import React, { useContext, useState, useEffect } from 'react'
import LineChartComponent from '../components/Linechart'
import GaugeChartComponent from '../components/GaugeChart'
import PieChartComponent from '../components/PieChart'
import { DataContext } from '../contexts/DataContext'
import { Paper, Stack, Typography } from '@mui/material'
import StudentSelector from '../components/StudentSelector'
import {
    aggregateRowsByColumn,
    filterRowsByColumn,
} from '../utils/DataProcessing'
import type { ColumnFilter } from '../utils/DataProcessing'
import NoDataWarning from '../components/NoDataWarning'
import _ from 'lodash'
import type { PieValueType } from '@mui/x-charts'

const StudentDashboard: React.FC = () => {
    const context = useContext(DataContext)
    if (!context) {
        throw new Error('DataContext not provided')
    }
    const { data } = context
    const [studentData, setStudentData] = useState<any[]>([])
    const [student_id, setStudentId] = useState<string>('')

    const addDataDate = (row: any) => {
        const date =
            row['Last Submitted'] ||
            row['Last Attendence'] ||
            row['Last Attended (AA)']
        return {
            ...row,
            Date: date,
        }
    }

    useEffect(() => {
        if (!data) {
            setStudentData([])
            return
        }
        const filter: ColumnFilter = {
            column: 'User',
            mode: 'equals',
            value: student_id,
        }
        const filteredData = filterRowsByColumn(data.rows, filter)
        const datedData = filteredData.map(addDataDate)
        const sortedData = _.sortBy(datedData, (row) => row['Date'])
        setStudentData(sortedData)
    }, [data, student_id])

    const getLatestData = () => {
        const lastRowData = _.last(studentData)
        if (!lastRowData) {
            return {}
        }
        return {
            ...lastRowData,
            'Academic Advising Sessions': _.max(
                studentData.map((row) => row['Academic Advising Sessions'])
            ),
            'Attended (AA)': _.max(
                studentData.map((row) => row['Attended (AA)'])
            ),
            'Explained Non Attendances (AA)': _.max(
                studentData.map((row) => row['Explained Non Attendances (AA)'])
            ),
            'Non Attendances (AA)': _.max(
                studentData.map((row) => row['Non Attendances (AA)'])
            ),
            'Attendance Not Recorded (AA)': _.max(
                studentData.map((row) => row['Attendance Not Recorded (AA)'])
            ),
        }
    }

    const latest_data = getLatestData()

    const attendanceData = aggregateRowsByColumn(studentData || [], {
        groupByColumn: 'Date',
        valueColumn: '% Attendance',
        mode: 'mean',
    }).filter((row) => row['Date'] !== 'undefined')

    console.log('Attendance Data:', attendanceData)

    const getPieSeries = (keys: string[]) => {
        const series = keys.map((key, index) => {
            if (latest_data[key] > 0) {
                return {
                    id: `${index}`,
                    value: latest_data[key],
                    label: key,
                }
            }
        })
        return series as PieValueType[]
    }

    const assessmentValues = {
        total: latest_data['Assessments'] as number,
        submitted: latest_data['Submitted'] as number,
        explained_non_submission: latest_data[
            'Explained Non-Submission'
        ] as number,
        non_submission: latest_data['Non-Submission'] as number,
    }

    return (
        <>
            {data ? (
                <Stack
                    sx={{
                        p: 3,
                    }}
                    spacing={4}
                    direction={'row'}
                >
                    <Stack spacing={4} sx={{ width: '20%' }}>
                        <StudentSelector
                            onSelect={(id) => setStudentId(id)}
                            sx={{ padding: 3 }}
                        />
                        <Paper>
                            <Stack spacing={2} sx={{ padding: 3 }}>
                                <Typography variant="h6">
                                    Student Overview
                                </Typography>
                                <Typography variant="subtitle1">
                                    Level of Study:{' '}
                                    {latest_data['Level of Study']}
                                </Typography>{' '}
                                <Typography variant="subtitle1">
                                    Course:{' '}
                                    {latest_data['Course Title'] || 'N/A'}
                                </Typography>
                                <Typography variant="subtitle1">
                                    Year of Course:{' '}
                                    {latest_data['Year of Course']}
                                </Typography>
                                <Typography variant="subtitle1">
                                    Registration Status:{' '}
                                    {latest_data['Registration Status'] ||
                                        'N/A'}
                                </Typography>
                            </Stack>
                        </Paper>
                    </Stack>
                    <LineChartComponent
                        x_values={_.map(attendanceData, 'Date') as string[]}
                        x_label={'Date'}
                        y_values={
                            _.map(attendanceData, '% Attendance') as number[]
                        }
                        y_label={'% Attendance'}
                        sx={{ flex: 2, padding: 3 }}
                    />
                    <Stack sx={{ flex: 1 }} spacing={4}>
                        <GaugeChartComponent
                            value={latest_data['Submitted']}
                            valueMax={latest_data['Assessments']}
                            title="Assessments Submitted"
                            placeholder={
                                latest_data['Assessments']
                                    ? undefined
                                    : 'No assessments yet'
                            }
                        />
                        <PieChartComponent
                            series_data={getPieSeries([
                                'Submitted',
                                'Explained Non-Submission',
                                'Non Submission',
                            ])}
                            title="Submission Breakdown"
                            placeholder={
                                latest_data['Assessments']
                                    ? undefined
                                    : 'No assessments yet'
                            }
                        />
                    </Stack>
                    <Stack sx={{ flex: 1 }} spacing={4}>
                        <GaugeChartComponent
                            value={latest_data['Attended (AA)']}
                            valueMax={latest_data['Academic Advising Sessions']}
                            title="Academic Advising Sessions"
                            placeholder={
                                latest_data['Academic Advising Sessions']
                                    ? undefined
                                    : 'No academic advising sessions yet'
                            }
                        />
                        <PieChartComponent
                            series_data={getPieSeries([
                                'Attended (AA)',
                                'Explained Non Attendance (AA)',
                                'Non Attendance (AA)',
                                'Attendance Not Required (AA)',
                            ])}
                            title="Sessions Breakdown  "
                            placeholder={
                                latest_data['Academic Advising Sessions']
                                    ? undefined
                                    : 'No academic advising sessions yet'
                            }
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
