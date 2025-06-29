import DataTable from './pages/DataTable'
import { CssBaseline } from '@mui/material'
import { BrowserRouter, Routes, Route } from 'react-router'
import { DataProvider } from './contexts/DataProvider'
import Upload from './pages/Upload'

function App() {
    return (
        <>
            <CssBaseline />
            <DataProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/table" element={<DataTable />} />
                        <Route path="/upload" element={<Upload />} />
                    </Routes>
                </BrowserRouter>
            </DataProvider>
        </>
    )
}

export default App
