import React from 'react';
import ColorChart2 from './ColorChart2'
import {getColorObjects} from "./colors";
import './App.css';

function App() {
  return (
    <div className="App">
      <ColorChart2 colors={getColorObjects()} />
    </div>
  );
}

export default App;
