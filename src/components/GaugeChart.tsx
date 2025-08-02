import { Container, Paper, Typography } from '@mui/material'
import React from 'react'
import { Gauge, gaugeClasses } from '@mui/x-charts'

interface GaugeChartProps {
    value: number
    valueMax?: number
    title?: string
    placeholder?: string
    sx?: React.CSSProperties
}

const GaugeChartComponent: React.FC<GaugeChartProps> = ({
    value,
    valueMax,
    title = 'Gauge Chart',
    placeholder,
    sx = { padding: 3 },
}) => {
    const gauge_text = valueMax ? ` ${value}  / ${valueMax}` : ''

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
                    <Gauge
                        value={value}
                        valueMax={valueMax ? valueMax : 100}
                        startAngle={-95}
                        endAngle={95}
                        text={gauge_text}
                        sx={{
                            [`& .${gaugeClasses.valueText}`]: {
                                fontSize: 30,
                                transform: 'translate(0px, -20px)',
                            },
                        }}
                    />
                )}
            </Container>
        </Paper>
    )
}

export default GaugeChartComponent
