import React, { useState } from 'react'
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import type { SelectChangeEvent } from '@mui/material/Select'

export interface AppSelectProps {
    onChange: (value: string) => void
    initialValue: string
    label: string
    menuItems: string[]
    menuLabels?: string[]
    sx?: React.CSSProperties
}

const AppSelect: React.FC<AppSelectProps> = ({
    onChange,
    initialValue,
    label,
    menuItems,
    menuLabels = [],
    sx = { margin: 2 },
}) => {
    const [selectedValue, setSelectedValue] = useState<string>(initialValue)

    const handleChange = (event: SelectChangeEvent) => {
        const value = event.target.value
        setSelectedValue(value)
        onChange(value)
    }
    return (
        <FormControl fullWidth sx={sx}>
            <InputLabel id="select-label">{label}</InputLabel>
            <Select
                labelId="select-label"
                id="select"
                value={selectedValue}
                label={label}
                onChange={handleChange}
            >
                {menuItems.map((item, index) => (
                    <MenuItem key={index} value={item}>
                        {menuLabels[index] || item}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

export default AppSelect
