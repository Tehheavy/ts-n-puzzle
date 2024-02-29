import React from 'react';
import './App.css';
import Navbar from './components/PuzzleNavBar';
import { HashRouter, Route, Routes } from 'react-router-dom';
import About from './routes/About';
import Home from './routes/Home';
import Game from './routes/Game';

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Home />,
//     // loader: rootLoader,
//   },
//   {
//     path: "about",
//     element: <About />,
//     // loader: teamLoader,
//   },
// ]);

function App() {
  return (
    <div className="App">
      <HashRouter basename="/">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
