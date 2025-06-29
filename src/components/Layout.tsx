import { Stack } from '@mui/material'
import { Outlet } from 'react-router'
import Navbar from './Navbar'

export default function Layout() {
    return (
        <Stack>
            <Navbar />
            <Outlet />
        </Stack>
    )
}
