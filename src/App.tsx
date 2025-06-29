import DataTable from './pages/DataTable'
import { CssBaseline } from '@mui/material'
import { BrowserRouter, Routes, Route } from 'react-router'

function App() {
    return (
        <>
            <CssBaseline />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<DataTable />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
