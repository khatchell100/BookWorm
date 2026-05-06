import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import GenrePage from './genrePage';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route,} from 'react-router-dom';
import MainPage from './mainPage';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <Routes>
        <Route
            path="/"
            element={<GenrePage />}
        />
        <Route
            path="/mainPage"
            element={<MainPage />}
        />
      </Routes>

    </React.StrictMode>
  </BrowserRouter>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
