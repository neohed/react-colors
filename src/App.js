import React from 'react';
import ColorChart1 from './ColorChart1'
import {getColorObjects} from "./colors";
import './App.css';

function App() {
  return (
    <div className="App">
      <ColorChart1 colors={getColorObjects()} />
    </div>
  );
}

export default App;
