import { Paper, Typography } from '@mui/material'
import React from 'react'
import { BarChart } from '@mui/x-charts/BarChart'

interface StackedBarChartProps {
    dataset: any[]
    xAxis: {
        dataKey: string
        label?: string
        formatter?: (value: unknown) => string
    }[]
    series: {
        dataKey: string
        label?: string
        formatter?: (value: unknown) => string
    }[]
    title: string
    placeholder?: string
    layout?: 'vertical' | 'horizontal'

    sx?: React.CSSProperties
}

const StackedBarChartComponent: React.FC<StackedBarChartProps> = ({
    dataset,
    xAxis,
    series,
    title,
    layout = 'vertical',
    placeholder,
    sx = { padding: 3 },
}) => {
    return (
        <Paper sx={sx}>
            <Typography variant="h6" sx={{ padding: 3 }}>
                {title}
            </Typography>
            {placeholder ? (
                <Typography
                    variant="subtitle1"
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        padding: 3,
                    }}
                >
                    {placeholder}
                </Typography>
            ) : (
                <BarChart
                    dataset={dataset}
                    xAxis={xAxis}
                    series={series}
                    height={200}
                    layout={layout}
                />
            )}
        </Paper>
    )
}

export default StackedBarChartComponent
