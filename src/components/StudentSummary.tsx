import { Paper, Typography, Stack } from '@mui/material'
import React from 'react'
import type { DataRow } from '../utils/ExcelParser'
import {
    aggregateRowsByColumn,
    findPercentRankByColumn,
} from '../utils/DataProcessing'

const StudentSummary: React.FC<{
    studentData: DataRow
    allData: DataRow[]
}> = ({ studentData, allData }) => {
    const sameYear = allData.filter(
        (row) => row['Year of Course'] === studentData['Year of Course']
    )
    const sameYearCourse = sameYear.filter(
        (row) => row['Course Title'] === studentData['Course Title']
    )

    const attendanceYearData = aggregateRowsByColumn(sameYear, {
        groupByColumn: 'User',
        valueColumn: '% Attendance',
        mode: 'latest',
    })
    const attendanceCourseData = aggregateRowsByColumn(sameYearCourse, {
        groupByColumn: 'User',
        valueColumn: '% Attendance',
        mode: 'latest',
    })
    const attendanceRate = (studentData['% Attendance'] || 0) * 100
    const sameYearRank =
        (1 -
            findPercentRankByColumn(
                attendanceYearData,
                '% Attendance',
                studentData['% Attendance'] || 0
            )) *
        100
    const sameCourseRank =
        (1 -
            findPercentRankByColumn(
                attendanceCourseData,
                '% Attendance',
                studentData['% Attendance'] || 0
            )) *
        100
    return (
        <>
            <Stack spacing={2}>
                <Paper
                    sx={{
                        padding: 3,
                    }}
                >
                    <Stack spacing={2}>
                        <Typography variant="h6">
                            Latest Attendance Rate
                        </Typography>
                        <Stack
                            direction="row"
                            alignItems="center"
                            spacing={5}
                            sx={{ paddingLeft: 2 }}
                        >
                            {' '}
                            <Typography
                                variant="h3"
                                fontWeight="bold"
                                sx={{
                                    color:
                                        attendanceRate > 70
                                            ? 'success.main'
                                            : attendanceRate > 50
                                            ? 'warning.main'
                                            : 'error.main',
                                    display: 'flex',
                                }}
                            >
                                {attendanceRate.toFixed(0)}%
                            </Typography>{' '}
                            <Stack>
                                <Typography
                                    variant="subtitle1"
                                    fontWeight="bold"
                                >
                                    Lower than or equal to{' '}
                                </Typography>
                                <Typography variant="body1">
                                    {sameYearRank.toFixed(0)}% of cohort
                                </Typography>
                                <Typography variant="body1">
                                    {sameCourseRank.toFixed(0)}% of coursemates
                                </Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                </Paper>

                <Paper
                    sx={{
                        padding: 3,
                    }}
                >
                    <Stack spacing={2}>
                        <Typography variant="h6" fontWeight="bold">
                            Student Overview
                        </Typography>
                        <Stack
                            spacing={1}
                            divider={
                                <div
                                    style={{
                                        borderBottom: '1px solid #eaeaea',
                                        width: '100%',
                                    }}
                                ></div>
                            }
                        >
                            <Typography
                                variant="body1"
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <span style={{ fontWeight: 500 }}>
                                    Level of Study:
                                </span>{' '}
                                {studentData['Level of Study']}
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <span style={{ fontWeight: 500 }}>Course:</span>{' '}
                                {studentData['Course Title'] || 'N/A'}
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <span style={{ fontWeight: 500 }}>
                                    Year of Course:
                                </span>{' '}
                                {studentData['Year of Course']}
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <span style={{ fontWeight: 500 }}>
                                    Registration Status:
                                </span>{' '}
                                {studentData['Registration Status'] || 'N/A'}
                            </Typography>
                        </Stack>
                    </Stack>
                </Paper>
            </Stack>
        </>
    )
}
export default StudentSummary
