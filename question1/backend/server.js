const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8000;

app.use(cors());

// Simulated stock data
const generateMockData = () => {
  const stocks = ['AAPL', 'GOOG', 'MSFT', 'AMZN', 'TSLA'];
  const now = Date.now();
  return stocks.map(stock => {
    const prices = [];
    for (let i = 0; i < 60; i++) {
      prices.push({
        time: new Date(now - i * 60000).toISOString(),
        price: +(Math.random() * 1000).toFixed(2),
      });
    }
    return { stock, prices };
  });
};

app.get('/api/v1/stocks', (req, res) => {
  res.json(generateMockData());
});

app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
