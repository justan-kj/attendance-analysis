import { Paper, Typography, Stack } from '@mui/material'
import React from 'react'
import AppSelect from './AppSelect'
import _ from 'lodash'
import { useContext, useState } from 'react'
import { DataContext } from '../contexts/DataContext'
import TextField from '@mui/material/TextField'

interface StudentSelectorProps {
    onSelect?: (studentId: string) => void
    sx?: React.CSSProperties
}

const StudentSelector: React.FC<StudentSelectorProps> = ({
    onSelect,
    sx = { padding: 3 },
}) => {
    const context = useContext(DataContext)
    if (!context) {
        throw new Error('DataContext not provided')
    }
    const { data } = context
    const [studentGroup, setStudentGroup] = useState<string>('')
    const [attendanceThreshold, setAttendanceThreshold] = useState<number>(50)

    const all_students = Array.from(new Set(_.map(data?.rows, 'User')))
    const aa_students = Array.from(
        new Set(
            _.filter(
                data?.rows,
                (row) => (row['Academic Advising Sessions'] as number) > 0
            ).map((row) => row['User'])
        )
    )
    const low_attendance_students = Array.from(
        new Set(
            _.filter(
                data?.rows,
                (row) => (row['% Attendance'] as number) <= attendanceThreshold
            ).map((row) => row['User'])
        )
    )

    let student_ids: string[] = []
    switch (studentGroup) {
        case 'AA':
            student_ids = aa_students as string[]
            break
        case 'Low Attendance':
            student_ids = low_attendance_students as string[]
            break
        default:
            student_ids = all_students as string[]
    }

    const handleSelect = (studentId: string) => {
        if (onSelect) {
            onSelect(studentId)
        }
    }
    return (
        <Paper sx={sx}>
            <Typography variant="h6">Select Student</Typography>
            {student_ids.length > 0 ? (
                <Stack spacing={2} sx={{ marginTop: 3 }}>
                    <AppSelect
                        onChange={(e) => setStudentGroup(e)}
                        label="Category"
                        initialValue={'All Students'}
                        menuItems={['All Students', 'AA', 'Low Attendance']}
                        menuLabels={[
                            'All Students (' + all_students.length + ')',
                            'Academic Advising (' + aa_students.length + ')',
                            'Low Attendance (' +
                                low_attendance_students.length +
                                ')',
                        ]}
                        sx={{}}
                    />
                    <AppSelect
                        onChange={(e) => handleSelect(e)}
                        label="Select Student"
                        initialValue={''}
                        menuItems={student_ids}
                        menuLabels={student_ids}
                        sx={{}}
                    />{' '}
                    {studentGroup == 'Low Attendance' && (
                        <TextField
                            label="Attendance Threshold"
                            variant="outlined"
                            fullWidth
                            onChange={(e) => {
                                setAttendanceThreshold(
                                    parseFloat(e.target.value)
                                )
                            }}
                            value={attendanceThreshold}
                            type="number"
                        />
                    )}
                </Stack>
            ) : (
                <Typography
                    variant="subtitle1"
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        padding: 3,
                    }}
                >
                    No students available
                </Typography>
            )}
        </Paper>
    )
}

export default StudentSelector
