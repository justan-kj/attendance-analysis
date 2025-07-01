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
                    </Typography>
                    <Link to="/barchart" style={{ color: 'inherit' }}>
                        <Button color="inherit">Bar Chart</Button>
                    </Link>
                    <Link to="/linechart" style={{ color: 'inherit' }}>
                        <Button color="inherit">Line Chart</Button>
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
