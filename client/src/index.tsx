import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AppProvider from './context/AppContext';
import AuthProvider from './context/AuthContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <AuthProvider>
    <AppProvider>
      <App />
    </AppProvider>
  </AuthProvider>
);