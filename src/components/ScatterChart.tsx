import { Paper, Typography } from '@mui/material'
import React from 'react'
import { ScatterChart } from '@mui/x-charts'
import type { ScatterSeriesType } from '@mui/x-charts'

interface ScatterChartProps {
    series: ScatterSeriesType[]
    title?: string
    sx?: React.CSSProperties
}

const ScatterChartComponent: React.FC<ScatterChartProps> = ({
    series,
    title = 'Scatter Chart',
    sx = { padding: 3 },
}) => {
    return (
        <Paper sx={sx}>
            <Typography sx={{ padding: 2 }} variant="h6">
                {title}
            </Typography>
            <ScatterChart series={series} height={600} />
        </Paper>
    )
}

export default ScatterChartComponent
