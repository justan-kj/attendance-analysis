import React, { useState } from 'react'
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import type { SelectChangeEvent } from '@mui/material/Select'
import type { SxProps, Theme } from '@mui/material/styles'

export interface AppSelectProps {
    onChange: (value: string) => void
    initialValue: string
    label: string
    menuItems: readonly string[]
    menuLabels?: readonly string[]
    sx?: SxProps<Theme>
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

    const handleChange = (event: SelectChangeEvent<string>) => {
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
