import { Paper } from '@mui/material'
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
        <>
            {data ? (
                <Paper
                    sx={{
                        marginTop: 4,
                        p: 6,
                        width: '90%',
                        alignContent: 'center',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                    }}
                >
                    <AttendanceDataTable tableData={data} />
                </Paper>
            ) : (
                <NoDataWarning />
            )}
        </>
    )
}

export default DataTablePage
