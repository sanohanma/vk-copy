import './App.css';
import './index.css';
import RoutesComponent from './components/routes/Routes';
import { initializeApp } from 'firebase/app';
import { AuthProvider } from './components/providers/AuthProvider';

const firebaseConfig = {
  apiKey: "AIzaSyBg9c9ZdAjhS84V9PpHo-EY6aVCDLdJWU0",
  authDomain: "vk-copy-3e666.firebaseapp.com",
  projectId: "vk-copy-3e666",
  storageBucket: "vk-copy-3e666.firebasestorage.app",
  messagingSenderId: "914513585073",
  appId: "1:914513585073:web:ff8451e1d9e39863bad390"
};

initializeApp(firebaseConfig);

function App() {
  return (
    <AuthProvider>
      <RoutesComponent />
    </AuthProvider>
  );
}

export default App;


