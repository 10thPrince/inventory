import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateProduct from "./pages/CreateProduct";
import EditProduct from "./pages/EditProduct";
import { useAuth } from "./context/AuthContext";

const AppShell = ({ children }) => {
  const { user } = useAuth();
  return (
    <div className="min-h-screen bg-slate-50">
      {user && <Navbar />}
      <main className="max-w-6xl mx-auto px-4 py-6">{children}</main>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AppShell>
                <Dashboard />
              </AppShell>
            </ProtectedRoute>
          }
        />
        <Route
          path="/products/new"
          element={
            <ProtectedRoute>
              <AppShell>
                <CreateProduct />
              </AppShell>
            </ProtectedRoute>
          }
        />
        <Route
          path="/products/:id/edit"
          element={
            <ProtectedRoute>
              <AppShell>
                <EditProduct />
              </AppShell>
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <AppShell>
              <Login />
            </AppShell>
          }
        />
        <Route
          path="/register"
          element={
            <AppShell>
              <Register />
            </AppShell>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;