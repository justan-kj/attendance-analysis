import React, { useState, useEffect } from 'react'
import type { ExcelTable } from '../utils/ExcelParser'
import { DataContext } from './DataContext'

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [data, setData] = useState<ExcelTable | null>(null)

    useEffect(() => {
        try {
            const savedData = localStorage.getItem('savedData')

            if (savedData) {
                setData(JSON.parse(savedData))
            }
        } catch (err) {
            console.error('Error loading saved data:', err)
        }
    }, [])

    const saveData = (data: ExcelTable | null) => {
        try {
            localStorage.setItem('savedData', JSON.stringify(data))
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
