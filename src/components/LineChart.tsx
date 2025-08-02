import { Paper, Typography } from '@mui/material'
import React from 'react'
import { LineChart } from '@mui/x-charts/LineChart'

interface LineChartProps {
    x_label: string
    y_label: string
    x_values: string[] | Date[]
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
    const isDateData = x_values.length > 0 && x_values[0] instanceof Date
    let processedXValues = x_values
    let processedYValues = y_values

    if (isDateData) {
        // Create pairs and sort by date
        const dataPoints = x_values
            .map((x, index) => ({
                x: x as Date,
                y: y_values[index],
            }))
            .sort((a, b) => a.x.getTime() - b.x.getTime())

        processedXValues = dataPoints.map((point) => point.x)
        processedYValues = dataPoints.map((point) => point.y)
    }
    const scaleType = isDateData ? 'time' : 'point'
    return (
        <Paper sx={sx}>
            <Typography marginBottom={2} variant="h6">
                {y_label} by {x_label}
            </Typography>
            <LineChart
                xAxis={[
                    {
                        label: x_label,
                        data: processedXValues,
                        scaleType: scaleType,
                    },
                ]}
                series={[
                    {
                        data: processedYValues,
                    },
                ]}
                yAxis={[{ label: y_label, min: 0, max: 100 }]}
                grid={{ horizontal: true }}
                margin={{ bottom: 60 }}
            />
        </Paper>
    )
}

export default LineChartComponent
