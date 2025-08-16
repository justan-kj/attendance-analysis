import { Paper, Typography, Stack } from '@mui/material'
import React from 'react'
import type { DataRow } from '../utils/ExcelParser'
import {
    aggregateRowsByColumn,
    findPercentRankByColumn,
} from '../utils/DataProcessing'

const getColor = (attendanceRate: number) => {
    if (attendanceRate > 70) {
        return 'success.main'
    } else if (attendanceRate > 50) {
        return 'warning.main'
    } else {
        return 'error.main'
    }
}

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

    const attendanceYearData = aggregateRowsByColumn(
        sameYear,
        ['User'],
        ['% Attendance'],
        ['latest']
    )
    const attendanceCourseData = aggregateRowsByColumn(
        sameYearCourse,
        ['User'],
        ['% Attendance'],
        ['latest']
    )
    const attendanceRate = studentData['% Attendance'] || 0
    const sameYearRank =
        findPercentRankByColumn(
            attendanceYearData,
            '% Attendance',
            studentData['% Attendance'] || 0
        ) * 100
    const sameCourseRank =
        findPercentRankByColumn(
            attendanceCourseData,
            '% Attendance',
            studentData['% Attendance'] || 0
        ) * 100
    return (
        <>
            <Stack spacing={4} flex={1}>
                <Paper
                    sx={{
                        padding: 3,
                    }}
                >
                    <Stack spacing={2} height={'100%'}>
                        <Typography variant="h6">
                            Latest Attendance Rate
                        </Typography>
                        <Stack
                            direction="row"
                            alignItems="center"
                            spacing={4}
                            justifyContent={'space-between'}
                            sx={{ paddingRight: 2 }}
                        >
                            {' '}
                            <Typography
                                variant="h3"
                                fontWeight="bold"
                                color={getColor(attendanceRate)}
                                flex={1}
                                textAlign={'center'}
                            >
                                {attendanceRate.toFixed(0)}%
                            </Typography>{' '}
                            <Stack spacing={0.5}>
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    spacing={1}
                                >
                                    <Typography variant="body1">
                                        Bottom{' '}
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        color={getColor(sameYearRank)}
                                    >
                                        {sameYearRank.toFixed(0)}%
                                    </Typography>
                                    <Typography variant="body1">
                                        of cohort
                                    </Typography>
                                </Stack>
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    spacing={1}
                                >
                                    <Typography variant="body1">
                                        Bottom
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        color={getColor(sameCourseRank)}
                                    >
                                        {sameCourseRank.toFixed(0)}%
                                    </Typography>
                                    <Typography variant="body1">
                                        of course
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Stack>
                </Paper>

                <Paper
                    sx={{
                        padding: 3,
                        flex: 1,
                    }}
                    id="overview"
                >
                    <Stack spacing={2} height={'100%'}>
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
