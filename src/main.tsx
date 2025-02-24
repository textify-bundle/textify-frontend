import { createRoot } from 'react-dom/client';
import App from './app/App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './store';
import * as Sentry from '@sentry/react';
import { YandexMetrika } from './utils/YandexMetrika';

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  tracesSampleRate: 1.0,
  tracePropagationTargets: ['localhost', /^https:\/\/yourserver\.io\/api/],
  replaysSessionSampleRate: 1.0,
  replaysOnErrorSampleRate: 1.0,
});

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = createRoot(rootElement);

  root.render(
    <Provider store={store}>
      <BrowserRouter>
        <YandexMetrika />
        <App />
      </BrowserRouter>
    </Provider>,
  );
}
