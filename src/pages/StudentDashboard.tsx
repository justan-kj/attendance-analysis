import React, { useState, useEffect } from 'react'
import LineChartComponent from '../components/Linechart'
import GaugeChartComponent from '../components/GaugeChart'
import PieChartComponent from '../components/PieChart'
import { Stack } from '@mui/material'
import StudentSelector from '../components/StudentSelector'
import {
    aggregateRowsByColumn,
    filterRowsByColumn,
} from '../utils/DataProcessing'
import type { ColumnFilter } from '../utils/DataProcessing'
import type { DataRow } from '../utils/ExcelParser'
import NoDataWarning from '../components/NoDataWarning'
import _ from 'lodash'
import type { PieValueType } from '@mui/x-charts'
import { useData } from '../hook/useData'
import StudentSummary from '../components/StudentSummary'

const StudentDashboard: React.FC = () => {
    const { data } = useData()
    const [studentData, setStudentData] = useState<DataRow[]>([])
    const [student_id, setStudentId] = useState<string>('')

    useEffect(() => {
        if (!data) {
            return
        }
        const filter: ColumnFilter = {
            column: 'User',
            mode: 'equals',
            value: student_id,
        }
        setStudentData(filterRowsByColumn(data, filter))
    }, [data, student_id])

    const getLatestData = () => {
        const lastRowData = _.last(studentData)
        if (!lastRowData) {
            return {} as DataRow
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
        } as DataRow
    }

    const latest_data = getLatestData()

    console.log('Stiudent Data:', studentData)

    const attendanceData = aggregateRowsByColumn(studentData, {
        groupByColumn: 'Last Date',
        valueColumn: '% Attendance',
        mode: 'mean',
    }).filter((row) => row['Last Date'])

    const getPieSeries = (keys: string[]) => {
        const series = keys.map((key, index) => {
            if ((latest_data[key] as number) > 0) {
                return {
                    id: `${index}`,
                    value: latest_data[key],
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
                        <StudentSummary data={latest_data} />
                    </Stack>
                    <LineChartComponent
                        x_values={
                            _.map(attendanceData, 'Last Date') as string[]
                        }
                        x_label={'Date'}
                        y_values={attendanceData.map(
                            (row) => (row['% Attendance'] as number) * 100 || 0
                        )}
                        y_label={'% Attendance'}
                        sx={{ flex: 2, padding: 3 }}
                    />
                    <Stack sx={{ flex: 1 }} spacing={4}>
                        <GaugeChartComponent
                            value={latest_data['Submitted'] || 0}
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
                            value={latest_data['Attended (AA)'] || 0}
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
