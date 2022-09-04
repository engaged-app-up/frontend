import React from 'react';
import ReactDOM from 'react-dom/client';
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebase';

const fireBase = initializeApp(firebaseConfig);

Sentry.init({
  dsn: "https://f827f8a2a6c2465fa4c104fcb0643bd0@o1368148.ingest.sentry.io/6670643",
  integrations: [new Integrations.BrowserTracing()],

  tracesSampleRate: 1.0,
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
