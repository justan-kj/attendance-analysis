import { Paper, Typography } from '@mui/material'
import React from 'react'
import { BarChart } from '@mui/x-charts/BarChart'

interface BarChartProps {
    x_label: string
    y_label: string
    x_values: string[]
    y_values: number[]
    layout?: 'vertical' | 'horizontal'
    sx?: React.CSSProperties
}

const BarChartComponent: React.FC<BarChartProps> = ({
    x_label,
    x_values,
    y_label,
    y_values,
    layout = 'vertical',
    sx = { padding: 3, height: 600 },
}) => {
    return (
        <Paper sx={sx}>
            <Typography variant="h6" sx={{ padding: 3 }}>
                {y_label} by {x_label}
            </Typography>
            <BarChart
                xAxis={[
                    {
                        label: x_label,
                        data: x_values,
                    },
                ]}
                series={[
                    {
                        data: y_values,
                    },
                ]}
                yAxis={[{ label: y_label }]}
                layout={layout}
            />
        </Paper>
    )
}

export default BarChartComponent
