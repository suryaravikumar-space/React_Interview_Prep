import React, { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Interview Prep</h1>
        <p>Master React concepts and prepare for technical interviews</p>
      </header>
      
      <main className="App-main">
        <div className="counter-demo">
          <h2>Counter Example</h2>
          <p>Current Count: <strong>{count}</strong></p>
          <div className="button-group">
            <button onClick={() => setCount(count + 1)}>Increment</button>
            <button onClick={() => setCount(count - 1)}>Decrement</button>
            <button onClick={() => setCount(0)}>Reset</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
