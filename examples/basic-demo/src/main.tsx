import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { StyleProvider, ThemeProvider } from '@zhama/a2ui';

import App from './App';
import './styles/globals.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* StyleProvider injects A2UI's CSS utility classes */}
    <StyleProvider>
      {/* ThemeProvider provides theme context for A2UI components */}
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </StyleProvider>
  </StrictMode>
);
