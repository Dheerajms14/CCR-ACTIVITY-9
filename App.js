import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Portfolio from './components/Portfolio';
import StockDetails from './components/StockDetails';

function App() {
  const [portfolio, setPortfolio] = useState([]);

  const handleBuyStock = (symbol, price) => {
    setPortfolio((prevPortfolio) => {
      const existingStock = prevPortfolio.find((stock) => stock.symbol === symbol);
      if (existingStock) {
        return prevPortfolio.map((stock) =>
          stock.symbol === symbol
            ? { ...stock, quantity: stock.quantity + 1, total: stock.total + price }
            : stock
        );
      } else {
        return [...prevPortfolio, { symbol, quantity: 1, total: price }];
      }
    });
  };

  const handleSellStock = (symbol) => {
    setPortfolio((prevPortfolio) =>
      prevPortfolio
        .map((stock) =>
          stock.symbol === symbol
            ? { ...stock, quantity: stock.quantity - 1, total: stock.total - stock.total / stock.quantity }
            : stock
        )
        .filter((stock) => stock.quantity > 0)
    );
  };

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/portfolio"
            element={<Portfolio portfolio={portfolio} onSellStock={handleSellStock} />}
          />
          <Route
            path="/stock/:symbol"
            element={<StockDetails onBuyStock={handleBuyStock} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
