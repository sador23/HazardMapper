import React from 'react';
import RouterWrapper from './components/router';
import {Header} from "./components/header";

function App() {
  return (
      <div className="App">
          <Header/>
          <RouterWrapper />
      </div>
  );
}

export default App;
