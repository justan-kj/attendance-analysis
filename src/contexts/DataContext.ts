import { createContext } from 'react'
import type { ExcelTable } from '../utils/ExcelParser'

interface DataContextType {
    data: ExcelTable | null
    setData: (data: ExcelTable | null) => void
    saveData: (data: ExcelTable | null) => void
    clearSavedData: () => void
}

export const DataContext = createContext<DataContextType | undefined>(undefined)
