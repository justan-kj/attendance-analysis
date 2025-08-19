import DataTablePage from './pages/DataTablePage'
import { CssBaseline, Box } from '@mui/material'
import { HashRouter, Routes, Route } from 'react-router'
import { DataProvider } from './contexts/DataProvider'
import UploadPage from './pages/UploadPage'
import AppLayout from './components/AppLayout'
import StudentDashboard from './pages/StudentDashboard'
import CustomChartPage from './pages/CustomChartPage'
import HomeDashboard from './pages/HomeDashboard'

function App() {
    return (
        <>
            <CssBaseline />
            <Box sx={{ backgroundColor: 'grey.50', minHeight: '100vh' }}>
                <DataProvider>
                    <HashRouter>
                        <AppLayout />
                        <Routes>
                            <Route path="/" element={<HomeDashboard />} />
                            <Route path="/table" element={<DataTablePage />} />
                            <Route path="/upload" element={<UploadPage />} />
                            <Route
                                path="/customchart"
                                element={<CustomChartPage />}
                            />
                            <Route
                                path="/dashboard"
                                element={<StudentDashboard />}
                            />
                        </Routes>
                    </HashRouter>
                </DataProvider>
            </Box>
        </>
    )
}

export default App
