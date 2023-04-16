import React from 'react';
import ReactDOMClient from 'react-dom/client';
import './index.css';
import App from './App';
import {GeneralProvider} from "./contexts/GeneralContext";
import reportWebVitals from './reportWebVitals';
import {createBrowserHistory} from 'history';

const container = document.getElementById('root');
const root = ReactDOMClient.createRoot(container);

export const history = createBrowserHistory();

root.render(<GeneralProvider>
    <App history={history}/>
</GeneralProvider>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
