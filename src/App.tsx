import DataTablePage from './pages/DataTablePage'
import { CssBaseline } from '@mui/material'
import { BrowserRouter, Routes, Route } from 'react-router'
import { DataProvider } from './contexts/DataProvider'
import UploadPage from './pages/UploadPage'
import AppLayout from './components/AppLayout'

function App() {
    return (
        <>
            <CssBaseline />
            <DataProvider>
                <BrowserRouter>
                    <AppLayout />
                    <Routes>
                        <Route path="/table" element={<DataTablePage />} />
                        <Route path="/upload" element={<UploadPage />} />
                    </Routes>
                </BrowserRouter>
            </DataProvider>
        </>
    )
}

export default App
