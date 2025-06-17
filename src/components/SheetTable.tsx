import React, { useState, useEffect } from 'react'
import { utils } from 'xlsx'
import type { WorkSheet } from 'xlsx'
import { DataGrid } from '@mui/x-data-grid'
import type { GridColDef } from '@mui/x-data-grid'

const SheetTable: React.FC<WorkSheet> = ({ worksheet }) => {
    const [rows, setRows] = useState<any[]>([])
    const [columns, setColumns] = useState<GridColDef[]>([])

    useEffect(() => {
        if (worksheet) {
            const json = utils.sheet_to_json(worksheet)
            const colNames = new Set<string>()
            json.forEach((row) => {
                Object.keys(row).forEach((key) => {
                    colNames.add(key)
                })
            })

            const columnDefs: GridColDef[] = Array.from(colNames).map(
                (col) => ({
                    field: col,
                    headerName: col,
                    flex: 1,
                    minWidth: 100,
                })
            )
            const rowsWithIds = json.map((row, index) => ({
                id: index,
                ...row,
            }))

            setColumns(columnDefs)
            setRows(rowsWithIds)
        }
    }, [worksheet])

    return (
        <DataGrid
            rows={rows}
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

export default SheetTable
