import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>
      <I18nextProvider i18n={i18next}>
        <h1 className='text-3xl font-bold underline'>Hello world!</h1>
      </I18nextProvider>
    </Router>
  );
}

export default App;
