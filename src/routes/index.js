import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from '../components/dashboard/Dashboard'
import PublicFile from '../components/publicFile/PublicFile'
import Index from '../components/index/Index'
import Login from '../components/login/Login'

const PrivateRoute = ({ children }) => {
  return localStorage.getItem('ekanekToken') ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }) => {
  return !localStorage.getItem('ekanekToken') && children;
}

export default function index() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<PublicRoute><Index /></PublicRoute>} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/public-file" element={<PublicFile />} />
      </Routes>
    </BrowserRouter>
  )
}
