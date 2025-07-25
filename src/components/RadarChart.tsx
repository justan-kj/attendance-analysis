import { Paper, Typography } from '@mui/material'
import React from 'react'
import { RadarChart } from '@mui/x-charts/RadarChart'

interface RadarChartProps {
    data: any[]
    labels: string[]
    max_value: number
    title?: string
}

const RadarChartComponent: React.FC<RadarChartProps> = ({
    data,
    labels,
    max_value,
    title = 'Radar Chart',
}) => {
    return (
        <Paper>
            <Typography variant="h6" sx={{ padding: 3 }}>
                {title}
            </Typography>
            <RadarChart
                series={[{ data: data }]}
                radar={{
                    max: max_value,
                    metrics: labels,
                }}
                height={600}
            />
        </Paper>
    )
}

export default RadarChartComponent
