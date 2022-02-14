import React from 'react';
// import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotFound from './NotFound';
import Login from './Login';
import HomePage from './HomePage';
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* <Route path="/:word/:partOfSpeech" element={<WordAndPos />} /> */}
          {/* <Route path="/:word" element={<Word />} /> */}
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/notfound" element={<NotFound />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
