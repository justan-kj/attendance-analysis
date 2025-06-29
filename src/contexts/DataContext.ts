import { createContext } from 'react'
import type { WorkSheet } from 'xlsx'

interface DataContextType {
    data: WorkSheet | null
    setData: (data: WorkSheet | null) => void
    saveData: (data: WorkSheet | null) => void
    clearSavedData: () => void
}

export const DataContext = createContext<DataContextType | undefined>(undefined)
