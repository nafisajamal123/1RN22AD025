import React from 'react';
import { Box, Typography, Tooltip } from '@mui/material';

const CorelationHeatmap = ({ data }) => {
  const computeCorelation = (a, b) => {
    const pricesA = a.prices.map(p => p.price);
    const pricesB = b.prices.map(p => p.price);
    const meanA = pricesA.reduce((a, b) => a + b, 0) / pricesA.length;
    const meanB = pricesB.reduce((a, b) => a + b, 0) / pricesB.length;
    const numerator = pricesA.reduce((sum, val, i) => sum + (val - meanA) * (pricesB[i] - meanB), 0);
    const denominator = Math.sqrt(
      pricesA.reduce((sum, val) => sum + (val - meanA) ** 2, 0) *
      pricesB.reduce((sum, val) => sum + (val - meanB) ** 2, 0)
    );
    return +(numerator / denominator).toFixed(2);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>Corelation Heatmap</Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: `repeat(${data.length + 1}, 1fr)` }}>
        <Box />
        {data.map(d => <Box key={d.stock} textAlign="center">{d.stock}</Box>)}
        {data.map(row => (
          <React.Fragment key={row.stock}>
            <Box>{row.stock}</Box>
            {data.map(col => {
              const value = row.stock === col.stock ? 1 : computeCorelation(row, col);
              const color = `rgba(0, 128, 0, ${Math.abs(value)})`;
              return (
                <Tooltip key={col.stock} title={`Corr: ${value}`}>
                  <Box sx={{
                    height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: value < 0 ? `rgba(255, 0, 0, ${Math.abs(value)})` : color,
                    color: 'white', fontWeight: 'bold'
                  }}>
                    {value}
                  </Box>
                </Tooltip>
              );
            })}
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
};

export default CorelationHeatmap;
