import { createRoot } from 'react-dom/client';
import App from './App';
import './index.scss';

// Импортируем Provider и BrowserRouter
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './shared/store/store';

// Получаем корневой элемент
const rootElement = document.getElementById('root');

// Проверяем, что rootElement не null, и создаем root
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
