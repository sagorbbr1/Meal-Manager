import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import NoPage from "./pages/NoPage";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import Members from "./pages/Members";
import Reports from "./pages/Reports";
import AddMember from "./pages/AddMember";
import AddMeal from "./pages/AddMeal";
import AddDeposit from "./pages/AddDeposite";
import AddCost from "./pages/AddCost";
import Settings from "./pages/Settings";
import CreateYourMess from "./pages/CreateYourMess";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import { MessProvider } from "./context/MessContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MessProvider>
          <Routes>
            <Route path="/" exact element={<HomePage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/dashboard/members"
              element={
                <ProtectedRoute>
                  {" "}
                  <Members />{" "}
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/reports"
              element={
                <ProtectedRoute>
                  <Reports />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/add-member"
              element={
                <ProtectedRoute>
                  <AddMember />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/add-meal"
              element={
                <ProtectedRoute>
                  <AddMeal />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/add-deposite"
              element={
                <ProtectedRoute>
                  <AddDeposit />
                </ProtectedRoute>
              }
            />

            <Route
              path="/dashboard/add-cost"
              element={
                <ProtectedRoute>
                  <AddCost />
                </ProtectedRoute>
              }
            />

            <Route
              path="/dashboard/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />

            <Route
              path="/create-your-mess"
              element={
                <ProtectedRoute>
                  <CreateYourMess />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            <Route
              path="/edit-profile"
              element={
                <ProtectedRoute>
                  <EditProfile />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<NoPage />} />
          </Routes>
        </MessProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
