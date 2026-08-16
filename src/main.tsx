import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { SettingsProvider } from './context/Settings';
import { ToastProvider } from './context/Toast';
import { WindowManagerProvider } from './context/WindowManager';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SettingsProvider>
      <ToastProvider>
        <WindowManagerProvider>
          <App />
        </WindowManagerProvider>
      </ToastProvider>
    </SettingsProvider>
  </StrictMode>
);
