import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login";
import AdminIndex from "./AdminIndex";
import AddArticle from "./AddArticle";
function Main() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/index" element={<AdminIndex />} />
        <Route path="/index/add/" element={<AddArticle />} />
      </Routes>
    </Router>
  );
}
export default Main;
