import { Stack } from '@mui/material'
import { Outlet } from 'react-router'
import Navbar from './Navbar'

export default function AppLayout() {
    return (
        <Stack>
            <Navbar />
            <Outlet />
        </Stack>
    )
}
