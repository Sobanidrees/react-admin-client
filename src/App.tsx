import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/authentication/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { InspectorDetails } from './pages/inspector-details/InspectorDetails';
import ProtectedRoute from './route/protectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/inspector-details"
          element={
            <ProtectedRoute>
              <InspectorDetails />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
