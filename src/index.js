import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
// import { AuthProvider } from './context/AuthProvider';


const root = ReactDOM.createRoot(document.getElementById('root'));
axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;
root.render(
  <React.StrictMode>
    
      <BrowserRouter>
        
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        
      </BrowserRouter>
    
  </React.StrictMode>
);


