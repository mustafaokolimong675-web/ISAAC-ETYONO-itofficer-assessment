import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import ListPage from './pages/ListPage';
import FormPage from './pages/FormPage';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tickets" element={<ListPage />} />
            <Route path="/tickets/new" element={<FormPage />} />
            <Route path="/tickets/edit/:id" element={<FormPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
