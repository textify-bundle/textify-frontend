import { createRoot } from 'react-dom/client';
import App from './App';
// import './index.scss';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './store';


const rootElement = document.getElementById('root');


if (rootElement) {
  const root = createRoot(rootElement);

  root.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}
