


import './App.css';
import './index.css';
import RoutesComponent from './components/routes/Routes';
// src/App.tsx
// import { AuthProvide } from './components/providers/AuthProvider'; // <-- Этот путь должен ТОЧНО совпадать
import AuthProvider from './components/providers/AuthProvider';
import { BrowserRouter as Router } from 'react-router-dom';


function App() {
  return (
    <Router>
      <AuthProvider>
        <RoutesComponent />
      </AuthProvider>
    </Router>
  );
}

export default App;
// export const db = getFirestore(app); // Эта строка закомментирована и не влияет на импорт


