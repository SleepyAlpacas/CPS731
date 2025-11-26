import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import "./styles/index.css";
import "./styles/theme.css";
import App from "./App.jsx";
import QuestionnaireModule from "./QuestionnaireModule.jsx";
import Admin from "./Admin.jsx";
import { BrowserRouter, Route, Routes } from "react-router";
import AdminAnswer from "./AdminAnswer.jsx";
import UserProfileModule from "./UserProfileModuleDisplay.jsx";
import UserProfileModuleDisplay from "./UserProfileModuleDisplay.jsx";
import AdminQuestion from "./AdminQuestion.jsx";
import LogIn from "./LogIn.jsx";
import SignUp from "./SignUp.jsx";
import { AuthProvider } from "./AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* <Route path="/" element={<App />} />
      <Route path="/questionnairemodule" element={<QuestionnaireModule />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/admin/answer" element={<AdminAnswer />} />
      <Route path="/admin/question" element={<AdminQuestion />} />
      <Route path="/user" element={<UserProfileModuleDisplay />} /> */}
          <Route path="/" element={<App />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/answer" element={<AdminAnswer />} />
          <Route path="/admin/question" element={<AdminQuestion />} />
          <Route path="/user" element={<UserProfileModule />} />
          <Route
            path="/questionnairemodule"
            element={<QuestionnaireModule />}
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
