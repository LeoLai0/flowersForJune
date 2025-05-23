import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { ConfigPage } from './pages/ConfigPage';
import { HomePage } from './pages/HomePage';
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute';

function App() {

  return (
    <div>
      <div className="absolute bg-red-200 top-50 h-60 w-75 blur-[100px] z-[-1]"></div>
      <div className="absolute bg-rose-200 top-20 right-0 h-60 w-75 blur-[50px] z-[-1]"></div>
      <div className="absolute bg-white top-30 h-10 w-dvw blur-[50px] z-[-1]"></div>
      <div className="absolute bg-fuchsia-100 bottom-40 right-20 h-20 w-dvw blur-[60px] z-[-1]"></div>
      <div className="absolute bg-orange-200 bottom-60 right-0 h-20 w-100 blur-[60px] z-[-1]"></div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/config" element={
            <ProtectedRoute requiredLevel='config'>
              <ConfigPage/>
            </ProtectedRoute>
            
          } />
          <Route path="/home" 
          element={
            <ProtectedRoute requiredLevel='user'>
              <HomePage/>
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </div>
    
  );
}

export default App;
