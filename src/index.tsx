import React from 'react';
import "./styles/index.css";
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, HashRouter} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
    <HashRouter>
        <App/>
    </HashRouter>
);

reportWebVitals();
