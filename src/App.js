import React from 'react';
import BreakControls from './components/BreakControls';
import SessionControls from './components/SessionControls';
import Timer from './components/Timer';

const App = () => (
  <div>
    <BreakControls />
    <SessionControls />
    <Timer />
    <h1 className="name">Designed and Coded By Elhamy</h1>
  </div>
);

export default App;
