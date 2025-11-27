import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./styles/theme.css";
import App from "./App.jsx";
import QuestionnaireModuleDisplay from "./QuestionnaireModuleDisplay.jsx";

import { BrowserRouter, Route, Routes } from "react-router";

import UserProfileModule from "./UserProfileModuleDisplay.jsx";

import Admin from "./AdminMenu.jsx";
import AdminQuestion from "./AdminQuestion.jsx";
import AdminAnswer from "./AdminAnswer.jsx";
import AdminOutcome from "./AdminOutcome.jsx";
import AdminAccount from "./AdminAccount.jsx";

import LogIn from "./LogIn.jsx";
import SignUp from "./SignUp.jsx";
import { AuthProvider } from "./UserProfileModule.jsx";

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
          <Route path="/admin/outcome" element={<AdminOutcome />} />
          <Route path="/admin/account" element={<AdminAccount />} />          

          <Route path="/user" element={<UserProfileModule />} />
          <Route
            path="/questionnairemodule"
            element={<QuestionnaireModuleDisplay />}
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
