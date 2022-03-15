import React, { Fragment } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import "./App.css";
import Home from "./components/layout/Home";
import About from "./components/layout/About";

const App = () => {
  return (
    <Router>
      <Fragment className="App">
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </Fragment>
    </Router>
  );
};

export default App;
