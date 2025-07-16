import { Paper, Stack, Typography, Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router'

const HomePage: React.FC = () => {
    return (
        <Paper sx={{ padding: 4, width: '50%', margin: 'auto', marginTop: 4 }}>
            <Stack
                direction="column"
                sx={{ marginTop: 4, justifyContent: 'center' }}
            >
                <Typography
                    variant="h4"
                    sx={{ padding: 3, textAlign: 'center' }}
                >
                    Welcome to the Attendance Analysis App!
                </Typography>
                <Typography variant="body1" sx={{ textAlign: 'center' }}>
                    This app allows you to upload Excel files containing stuent
                    attendance data and visualize through charts and tables.
                </Typography>
                <Typography
                    variant="body1"
                    sx={{ padding: 1, textAlign: 'center' }}
                >
                    To get started, upload the attendance data here
                </Typography>

                <Button
                    variant="contained"
                    color="primary"
                    sx={{ margin: 'auto' }}
                >
                    <Link
                        to="/upload"
                        style={{ color: 'inherit', textDecoration: 'none' }}
                    >
                        Upload Data
                    </Link>
                </Button>
            </Stack>
        </Paper>
    )
}

export default HomePage
