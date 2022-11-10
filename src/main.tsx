import i18n from '@/languages/i18n';
import ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import 'virtual:windi.css';

import App from './App';
import './index.css';

import '@/common/utils/prototypes';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <I18nextProvider i18n={i18n}>
    <App />
  </I18nextProvider>,
  // </React.StrictMode>,
);
