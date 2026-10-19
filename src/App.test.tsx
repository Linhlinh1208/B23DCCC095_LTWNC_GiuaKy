import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { ThemeProvider } from './context/ThemeContext';
import App from './App';

test('renders Mini Library title', () => {
  render(
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  );
  expect(screen.getByText(/Mini Library/i)).toBeInTheDocument();
});