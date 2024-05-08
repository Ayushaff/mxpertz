import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DesignOne from "./pages/DesignOne";
import DesignTwo from "./pages/DesignTwo";
import Home from "./pages/Home";
import "./App.css";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/design-two/" element={<DesignTwo />}></Route>
        <Route path="/design-two/:id" element={<DesignTwo />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
