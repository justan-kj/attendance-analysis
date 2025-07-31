import { Paper, Typography } from '@mui/material'
import React from 'react'
import { LineChart } from '@mui/x-charts/LineChart'

interface LineChartProps {
    x_label: string
    y_label: string
    x_values: string[]
    y_values: number[]
    sx?: React.CSSProperties
}

const LineChartComponent: React.FC<LineChartProps> = ({
    x_label,
    x_values,
    y_label,
    y_values,
    sx = { padding: 3 },
}) => {
    return (
        <Paper sx={sx}>
            <Typography sx={{ padding: 2 }} variant="h6">
                {y_label} by {x_label}
            </Typography>
            <LineChart
                xAxis={[
                    {
                        label: x_label,
                        data: x_values,
                        scaleType: 'point',
                    },
                ]}
                series={[
                    {
                        data: y_values,
                    },
                ]}
                yAxis={[{ label: y_label, min: 0, max: 100 }]}
                height={600}
                grid={{ horizontal: true }}
            />
        </Paper>
    )
}

export default LineChartComponent
