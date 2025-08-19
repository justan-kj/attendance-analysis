import React, { useState, useEffect } from 'react'
import type { ExcelTable } from '../utils/ExcelParser'
import { DataContext } from './DataContext'
import { saveDataset, loadDataset } from '../utils/DataPersistence'

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [data, setData] = useState<ExcelTable | null>(null)

    useEffect(() => {
        try {
            const savedData = localStorage.getItem('savedData')

            if (savedData) {
                setData(loadDataset())
            }
        } catch (err) {
            console.error('Error loading saved data:', err)
        }
    }, [])

    const saveData = (data: ExcelTable | null) => {
        if (!data) {
            return
        }
        try {
            saveDataset(data)
        } catch (err) {
            console.error('Error saving data:', err)
        }
    }

    const clearSavedData = () => {
        localStorage.removeItem('savedData')
        setData(null)
    }

    return (
        <DataContext.Provider
            value={{
                data,
                setData,
                saveData,
                clearSavedData,
            }}
        >
            {children}
        </DataContext.Provider>
    )
}
