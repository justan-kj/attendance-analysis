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
                    <Button color="inherit">
                        <Link to="/upload" style={{ color: 'inherit' }}>
                            Upload
                        </Link>
                    </Button>
                    <Button color="inherit">
                        <Link to="/table" style={{ color: 'inherit' }}>
                            Table
                        </Link>
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    )
}
