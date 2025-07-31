import { useContext } from 'react'
import { DataContext } from '../contexts/DataContext'
import type { DataRow } from '../utils/ExcelParser'

export const useData = () => {
    const context = useContext(DataContext)
    if (!context) {
        throw new Error('No DataProvider')
    }
    return context?.data?.rows as DataRow[]
}
