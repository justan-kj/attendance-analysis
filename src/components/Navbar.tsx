import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'

import { Link } from 'react-router'

export default function Navbar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        Attendance Analysis
                    </Typography>{' '}
                    <Link to="/" style={{ color: 'inherit' }}>
                        <Button color="inherit">Home</Button>
                    </Link>{' '}
                    <Link to="/dashboard" style={{ color: 'inherit' }}>
                        <Button color="inherit">Dashboard</Button>
                    </Link>
                    <Link to="/customchart" style={{ color: 'inherit' }}>
                        <Button color="inherit">Custom Chart</Button>
                    </Link>
                    <Link to="/table" style={{ color: 'inherit' }}>
                        <Button color="inherit">Data Table</Button>{' '}
                    </Link>{' '}
                    <Link to="/upload" style={{ color: 'inherit' }}>
                        <Button color="inherit">Upload Data</Button>
                    </Link>
                </Toolbar>
            </AppBar>
        </Box>
    )
}
