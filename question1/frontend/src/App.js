import React, { useEffect, useState } from 'react';
import { Container, Typography, Tabs, Tab, Box } from '@mui/material';
import StockChart from './components/StockChart';
import CorelationHeatmap from './components/CorelationHeatmap';
import axios from 'axios';

function App() {
  const [tabIndex, setTabIndex] = useState(0);
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/v1/stocks')
      .then(res => setStockData(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Stock Price Aggregation</Typography>
      <Tabs value={tabIndex} onChange={(e, newVal) => setTabIndex(newVal)}>
        <Tab label="Stock Page" />
        <Tab label="Corelation Heatmap" />
      </Tabs>
      <Box mt={3}>
        {tabIndex === 0 && <StockChart data={stockData} />}
        {tabIndex === 1 && <CorelationHeatmap data={stockData} />}
      </Box>
    </Container>
  );
}

export default App;
