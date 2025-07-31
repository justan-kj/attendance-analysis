import React, { useState, useEffect } from 'react'
import type { ExcelTable } from '../utils/ExcelParser'
import { DataGrid } from '@mui/x-data-grid'
import type { GridColDef, GridRowsProp } from '@mui/x-data-grid'

interface SheetTableProps {
    tableData: ExcelTable
}

const AttendanceDataTable: React.FC<SheetTableProps> = ({ tableData }) => {
    const [tableRows, setTableRows] = useState<GridRowsProp>([])
    const [columns, setColumns] = useState<GridColDef[]>([])

    useEffect(() => {
        if (tableData) {
            const columnDefs: GridColDef[] = tableData.headers.map((col) => ({
                field: col,
                headerName: col,
                flex: 1,
                minWidth: 100,
            }))
            const rowsWithIds = tableData.rows.map((row, index) => ({
                id: index,
                ...row,
            }))

            setColumns(columnDefs)
            setTableRows(rowsWithIds)
        }
    }, [tableData])

    return (
        <DataGrid
            rows={tableRows}
            columns={columns}
            initialState={{
                pagination: {
                    paginationModel: { pageSize: 10, page: 0 },
                },
            }}
            pageSizeOptions={[5, 10, 25, 50, 100]}
        />
    )
}

export default AttendanceDataTable
