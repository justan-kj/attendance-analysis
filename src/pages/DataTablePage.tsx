import { Container, Paper } from '@mui/material'
import React, { useContext } from 'react'
import AttendanceDataTable from '../components/AttendanceDataTable'
import { DataContext } from '../contexts/DataContext'
import NoDataWarning from '../components/NoDataWarning'

const DataTablePage: React.FC = () => {
    const context = useContext(DataContext)
    if (!context) {
        throw new Error('DataContext not provided')
    }
    const { data } = context

    return (
        <Container>
            {data ? (
                <Paper sx={{ marginTop: 2, p: 3 }}>
                    <AttendanceDataTable tableData={data} />
                </Paper>
            ) : (
                <NoDataWarning />
            )}
        </Container>
    )
}

export default DataTablePage
