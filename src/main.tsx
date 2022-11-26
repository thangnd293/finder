import i18n from '@/languages/i18n';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import './index.css';

import '@/common/utils/prototypes';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <I18nextProvider i18n={i18n}>
    <Router>
      <App />
    </Router>
  </I18nextProvider>,
  // </React.StrictMode>,
);
