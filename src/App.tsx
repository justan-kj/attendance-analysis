import DataTable from './pages/DataTable'
import { CssBaseline } from '@mui/material'
import { BrowserRouter, Routes, Route } from 'react-router'
import { DataProvider } from './contexts/DataProvider'

function App() {
    return (
        <>
            <CssBaseline />
            <DataProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<DataTable />} />
                    </Routes>
                </BrowserRouter>
            </DataProvider>
        </>
    )
}

export default App
