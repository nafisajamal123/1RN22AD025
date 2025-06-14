import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MenuItem, Select, Typography } from '@mui/material';

const StockChart = ({ data }) => {
  const [minutes, setMinutes] = useState(15);

  const filteredData = data.map(stock => ({
    stock: stock.stock,
    prices: stock.prices.slice(0, minutes),
  }));

  return (
    <div>
      <Typography variant="h6">Select Time Frame (minutes):</Typography>
      <Select value={minutes} onChange={(e) => setMinutes(+e.target.value)} sx={{ mb: 2 }}>
        {[15, 30, 45, 60].map(min => (
          <MenuItem key={min} value={min}>{min}</MenuItem>
        ))}
      </Select>

      {filteredData.map(stock => (
        <div key={stock.stock}>
          <Typography variant="subtitle1">{stock.stock}</Typography>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={stock.prices.reverse()}>
              <XAxis dataKey="time" tick={false} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="price" stroke="#8884d8" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ))}
    </div>
  );
};

export default StockChart;
