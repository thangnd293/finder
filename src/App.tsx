import { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Overlay from './components/Overlay';

function App() {
  const [showOverlay, setShowOverlay] = useState(false);
  return (
    <Router>
      <div className='App'>
        <button onClick={() => setShowOverlay(!showOverlay)}>
          Toggle overlay
        </button>
        <Overlay visible={showOverlay}>
          <div className='w-10 h-10 bg-white rounded-sm'>Hello world</div>
        </Overlay>
      </div>
    </Router>
  );
}

export default App;
``;
