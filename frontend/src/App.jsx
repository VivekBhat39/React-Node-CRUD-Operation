import React from 'react';
import './App.css';
import Create from './components/Create';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Users from './components/Users';

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Create />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<Create />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
};
