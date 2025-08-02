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
            <Typography variant="h6" marginBottom={2}>
                {title}
            </Typography>{' '}
            <Container
                sx={{
                    height: '80%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignContent: 'center',
                }}
            >
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
                        slotProps={{
                            legend: {
                                direction: 'vertical',
                                position: {
                                    vertical: 'middle',
                                    horizontal: 'center',
                                },
                            },
                        }}
                        height={220}
                    />
                )}{' '}
            </Container>
        </Paper>
    )
}

export default PieChartComponent
