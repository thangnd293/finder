import { useTranslation } from 'react-i18next';
import { BrowserRouter as Router } from 'react-router-dom';

import { lngs, t } from './languages/i18n';

function App() {
  const { i18n } = useTranslation();
  return (
    <Router>
      <div className='App'>
        <header className='App-header'>
          <div>
            {Object.keys(lngs).map(lng => (
              <button
                key={lng}
                style={{
                  fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal',
                }}
                type='submit'
                onClick={() => {
                  i18n.changeLanguage(lng);
                }}
              >
                {lngs[lng as keyof typeof lngs].nativeName}
              </button>
            ))}
          </div>

          <a
            className='App-link'
            href='https://reactjs.org'
            target='_blank'
            rel='noopener noreferrer'
          ></a>
        </header>
        <div>{t(`common.title`)}</div>
      </div>
    </Router>
  );
}

export default App;
``;
