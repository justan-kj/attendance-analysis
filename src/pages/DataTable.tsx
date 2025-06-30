import { Container, Paper } from '@mui/material'
import React, { useContext } from 'react'
import SheetTable from '../components/SheetTable'
import { DataContext } from '../contexts/DataContext'

const DataTable: React.FC = () => {
    const context = useContext(DataContext)
    if (!context) {
        throw new Error('DataContext not provided')
    }
    const { data } = context

    return (
        <Container>
            {data && (
                <Paper sx={{ marginTop: 2, p: 3 }}>
                    <SheetTable worksheet={data} />
                </Paper>
            )}
        </Container>
    )
}

export default DataTable
