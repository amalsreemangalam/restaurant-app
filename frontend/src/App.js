import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MenuList from './pages/MenuList';
import MenuDetail from './pages/MenuDetail';
import CreateMenu from './pages/CreateMenu';
import EditMenu from './pages/EditMenu';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<MenuList />} />
            <Route path="/menus/create" element={<CreateMenu />} />
            <Route path="/menus/:id" element={<MenuDetail />} />
            <Route path="/menus/:id/edit" element={<EditMenu />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
