import { Paper, Typography, Container } from '@mui/material'
import React from 'react'
import { PieChart } from '@mui/x-charts/PieChart'
import type { PieValueType } from '@mui/x-charts'

interface PieChartProps {
    title: string
    series_data: PieValueType[]
    placeholder?: string
    sx?: React.CSSProperties
}

const PieChartComponent: React.FC<PieChartProps> = ({
    title,
    series_data,
    placeholder,
    sx = { padding: 3 },
}) => {
    return (
        <Paper sx={sx}>
            <Typography variant="h6">{title}</Typography>
            <Container sx={{ marginTop: 2 }}>
                {placeholder ? (
                    <Typography
                        variant="subtitle1"
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        {placeholder}
                    </Typography>
                ) : (
                    <PieChart
                        series={[
                            {
                                data: series_data,
                            },
                        ]}
                        height={200}
                        slotProps={{
                            legend: {
                                direction: 'horizontal',
                                position: {
                                    vertical: 'bottom',
                                    horizontal: 'center',
                                },
                            },
                        }}
                    />
                )}
            </Container>
        </Paper>
    )
}

export default PieChartComponent
