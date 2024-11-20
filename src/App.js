import React, { useState } from 'react';
import './App.css';
import MobilePricePredictor from './MobilePricePredictor';

function App() {
  return (
    <div className="container">
      <h1>Mobile Price Prediction</h1>
      <MobilePricePredictor />
    </div>
  );
}

export default App