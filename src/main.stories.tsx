import type { Meta, StoryObj } from '@storybook/react';

import App from './app/App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './store';

const meta: Meta<typeof App> = {
  title: 'Main/App',
  component: App,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <BrowserRouter>
          <Story />
        </BrowserRouter>
      </Provider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof App>;

export const Main: Story = {
  args: {
  },
};
