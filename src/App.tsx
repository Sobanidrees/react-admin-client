import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/authentication/login/Login';
import { Dashboard } from './pages/dashboard/Dashboard';
import { InspectorDetails } from './pages/inspector-details/InspectorDetails';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/inspector-details" element={<InspectorDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
