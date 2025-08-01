import DataTablePage from './pages/DataTablePage'
import { CssBaseline } from '@mui/material'
import { BrowserRouter, Routes, Route } from 'react-router'
import { DataProvider } from './contexts/DataProvider'
import UploadPage from './pages/UploadPage'
import AppLayout from './components/AppLayout'
import HomePage from './pages/HomePage'
import StudentDashboard from './pages/StudentDashboard'
import CustomChartPage from './pages/CustomChartPage'

function App() {
    return (
        <>
            <CssBaseline />
            <DataProvider>
                <BrowserRouter>
                    <AppLayout />
                    <Routes>
                        <Route path="/" element={<HomePage />} />
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
                </BrowserRouter>
            </DataProvider>
        </>
    )
}

export default App
