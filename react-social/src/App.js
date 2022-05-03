import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import { AuthContext } from './context/authContext';
import {useContext} from 'react';
import { LoginPage } from './pages/loginPage/loginPage';
import { LoginForm } from './components/auth/loginForm/loginForm';
import { RegisterForm } from './components/auth/registerForm/registerForm';
import { ForgetPasswordForm } from './components/auth/forgetPasswordForm/forgetPasswordForm';
import { HomePage } from './pages/homePage/homePage';
import {ProfilePage} from './pages/profilePage/profilePage';

function App() {
  const {user} = useContext(AuthContext);

  return (
    <Router>
      <Routes>
          <Route path='/' element={
            user 
            ? <HomePage /> 
            : <LoginPage><LoginForm/></LoginPage>
          }/>
          <Route path="/login" element={
            user 
            ? <Navigate to="/"/> 
            : <LoginPage><LoginForm/></LoginPage>}
          />
          <Route path="/register" element={
            user 
            ? <Navigate to="/"/> 
            : <LoginPage><RegisterForm/></LoginPage>}
          />
          <Route path="/reset" element={
            user 
            ? <Navigate to="/"/> 
            : <LoginPage><ForgetPasswordForm/></LoginPage>}
          />
          <Route path="/profile/:login" element={
            <ProfilePage/>
          }/>
      </Routes>
    </Router>
  );
}

export default App;
