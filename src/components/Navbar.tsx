import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import { Link } from 'react-router'

export default function Navbar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Link to="/upload" style={{ color: 'inherit' }}>
                        <Button color="inherit">Upload</Button>
                    </Link>{' '}
                    <Link to="/table" style={{ color: 'inherit' }}>
                        <Button color="inherit">Table</Button>{' '}
                    </Link>
                </Toolbar>
            </AppBar>
        </Box>
    )
}
