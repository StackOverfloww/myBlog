import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login";
import AdminIndex from "./AdminIndex";
import AddArticle from "./AddArticle";
import ArticleList from "./ArticleList";
function Main() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/index" element={<AdminIndex />}>
          <Route path="list" element={<ArticleList />} />
          <Route path="add" element={<AddArticle />} />
          <Route path="add/:id" element={<AddArticle />} />
        </Route>
      </Routes>
    </Router>
  );
}
export default Main;
