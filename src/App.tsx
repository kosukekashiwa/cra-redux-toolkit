import React from 'react';
import { Counter } from './features/counter/Counter';
import './App.css';
import { Box, Button } from '@mui/material';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Counter />
      </header>
    </div>
  );
}

export default App;
