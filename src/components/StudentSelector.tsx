import {
    Paper,
    Typography,
    Stack,
    Checkbox,
    IconButton,
    FormControlLabel,
} from '@mui/material'
import React from 'react'
import AppSelect from './AppSelect'
import _ from 'lodash'
import { useState } from 'react'
import TextField from '@mui/material/TextField'
import type { DataRow } from '../utils/ExcelParser'
import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'
import SettingsIcon from '@mui/icons-material/Settings'
import CloseIcon from '@mui/icons-material/Close'
import { aggregateRowsByColumn } from '../utils/DataProcessing'

interface StudentSelectorProps {
    data: DataRow[]
    studentData: DataRow
    onSelect?: (studentId: string) => void
    sx?: React.CSSProperties
}

interface SettingsDialogProps {
    open: boolean
    onClose: (threshold: number, showWithdrawn: boolean) => void
    attendanceThreshold: number
    isShowingWithdrawn: boolean
}

const StudentSelector: React.FC<StudentSelectorProps> = ({
    data,
    studentData,
    onSelect,
    sx = { padding: 3 },
}) => {
    const [studentGroup, setStudentGroup] = useState<string>('')
    const [attendanceThreshold, setAttendanceThreshold] = useState<number>(50)
    const [isShowingWithdrawn, setIsShowingWithdrawn] = useState<boolean>(false)
    const [openSettings, setOpenSettings] = useState<boolean>(false)

    const validStudents = data.filter(
        (row) =>
            isShowingWithdrawn ||
            row['Registration Status'] === 'SUCCESSFUL' ||
            row['Registration Status'] === 'REGISTERED'
    )

    const all_students = Array.from(
        new Set(validStudents.map((row) => row['User']))
    ).sort()

    const aa_students = Array.from(
        new Set(
            validStudents
                .filter((row) => (row['Academic Advising Sessions'] || 0) > 0)
                .map((row) => row['User'])
        )
    )

    const latestAttendanceData = aggregateRowsByColumn(validStudents, {
        groupByColumn: 'User',
        valueColumn: '% Attendance',
        mode: 'latest',
    })

    console.log('latestAttendanceData', latestAttendanceData)

    const low_attendance_students = Array.from(
        new Set(
            _.filter(
                latestAttendanceData,
                (row) => (row['% Attendance'] || 0) <= attendanceThreshold / 100
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

    const handleDialogClose = (threshold: number, showWithdrawn: boolean) => {
        setAttendanceThreshold(threshold)
        setIsShowingWithdrawn(showWithdrawn)
        setOpenSettings(false)
    }

    return (
        <Paper sx={sx}>
            <SettingsDialog
                open={openSettings}
                onClose={handleDialogClose}
                attendanceThreshold={attendanceThreshold}
                isShowingWithdrawn={isShowingWithdrawn}
            />
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
            >
                <Typography variant="h6">Select Student</Typography>
                <IconButton onClick={() => setOpenSettings(true)}>
                    <SettingsIcon />
                </IconButton>
            </Stack>
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
                    />
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

const SettingsDialog: React.FC<SettingsDialogProps> = ({
    open,
    onClose,
    attendanceThreshold,
    isShowingWithdrawn,
}) => {
    const [threshold, setThreshold] = useState(attendanceThreshold)
    const [showWithdrawn, setShowWithdrawn] = useState(isShowingWithdrawn)

    const handleClose = () => {
        onClose(threshold, showWithdrawn)
    }

    if (!open) return null

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
                {' '}
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    Settings{' '}
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>{' '}
                </Stack>
            </DialogTitle>

            <Stack spacing={2} sx={{ padding: 3 }}>
                <TextField
                    label="Low Attendance Threshold"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setThreshold(parseFloat(e.target.value))}
                    value={threshold}
                    type="number"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={showWithdrawn}
                            onChange={(e) => setShowWithdrawn(e.target.checked)}
                        />
                    }
                    label="Show Withdrawn Students"
                />
            </Stack>
        </Dialog>
    )
}
export default StudentSelector
