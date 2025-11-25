import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import "./styles/index.css";
import "./styles/theme.css";
import App from "./App.jsx";
import QuestionnaireModule from "./QuestionnaireModule.jsx";
import Admin from "./Admin.jsx";
import { BrowserRouter, Route, Routes } from "react-router";
import AdminAnswer from "./AdminAnswer.jsx";
import UserProfileModule from "./UserProfileModule.jsx";
import AdminQuestion from "./AdminQuestion.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/questionnairemodule" element={<QuestionnaireModule />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/admin/answer" element={<AdminAnswer />} />
      <Route path="/admin/question" element={<AdminQuestion />} />
      <Route path="/user" element={<UserProfileModule />} />
    </Routes>
  </BrowserRouter>
);
