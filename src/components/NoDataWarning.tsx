import React from 'react'
import { Stack, Typography, Button, alpha } from '@mui/material'
import { Link } from 'react-router'

const NoDataWarning: React.FC = () => {
    return (
        <Stack
            sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: alpha('#fff', 0.8),
                zIndex: 1000,
            }}
        >
            <Typography
                variant="h5"
                component="h2"
                color="text.primary"
                gutterBottom
            >
                No Data Available
            </Typography>

            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Upload an Excel file to view attendance data.
            </Typography>

            <Button variant="contained" color="primary" size="large">
                <Link
                    to="/upload"
                    style={{ color: 'inherit', textDecoration: 'none' }}
                >
                    Upload Data
                </Link>
            </Button>
        </Stack>
    )
}

export default NoDataWarning
