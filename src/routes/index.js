import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from '../components/dashboard/Dashboard'
import PublicFile from '../components/publicFile/PublicFile'
import Index from '../components/index/Index'
import Login from '../components/login/Login'

export default function index() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Index />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/public-file" element={<PublicFile />} />
      </Routes>
    </BrowserRouter>
  )
}
