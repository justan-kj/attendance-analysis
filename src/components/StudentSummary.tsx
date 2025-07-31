import { Paper, Typography, Stack } from '@mui/material'
import React from 'react'
import type { DataRow } from '../utils/ExcelParser'

const StudentSummary: React.FC<{ data: DataRow }> = ({ data }) => {
    return (
        <Paper>
            <Stack spacing={2} sx={{ padding: 3 }}>
                <Typography variant="h6">Student Overview</Typography>
                <Typography variant="subtitle1">
                    Level of Study: {data['Level of Study']}
                </Typography>{' '}
                <Typography variant="subtitle1">
                    Course: {data['Course Title'] || 'N/A'}
                </Typography>
                <Typography variant="subtitle1">
                    Year of Course: {data['Year of Course']}
                </Typography>
                <Typography variant="subtitle1">
                    Registration Status: {data['Registration Status'] || 'N/A'}
                </Typography>
            </Stack>
        </Paper>
    )
}
export default StudentSummary
