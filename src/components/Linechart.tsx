import { Paper, Typography, Container } from '@mui/material'
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
            <Typography variant="h6">
                {y_label} by {x_label}
            </Typography>
            <Container sx={{ marginTop: 2 }}>
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
                    height={500}
                    grid={{ horizontal: true }}
                />
            </Container>
        </Paper>
    )
}

export default LineChartComponent
