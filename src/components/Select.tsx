import React, { useState } from 'react'
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import type { SelectChangeEvent } from '@mui/material/Select'

export interface AppSelectProps {
    onChange: (value: string) => void
    label: string
    menuItems: string[]
}

const AppSelect: React.FC<AppSelectProps> = ({
    onChange,
    label,
    menuItems,
}) => {
    const [selectedValue, setSelectedValue] = useState<string>('')

    const handleChange = (event: SelectChangeEvent) => {
        const value = event.target.value
        setSelectedValue(value)
        onChange(value)
    }
    return (
        <FormControl
            fullWidth
            sx={{
                margin: 2,
            }}
        >
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
                        {item}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

export default AppSelect
