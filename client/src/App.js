import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext';

import Home from './pages/Home';
import AboutMe from './pages/AboutMe';
import Links from './pages/Links';
import Dock from './components/Dock';
import Post from './pages/Post';
import CreatePost from './pages/CreatePost';
import PageNotFound from './pages/PageNotFound';
import SignUpPage from './pages/SignUpPage';
import OTPVerify from './pages/OTPVerify';
import PrivateRoute from './components/PrivateRoute';
import PublicOnlyRoute from './components/PublicOnlyRoute';


function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Dock />
          <Routes>
            <Route path="/Welcome" element={<PublicOnlyRoute><SignUpPage /></PublicOnlyRoute>} />
            <Route path="/VerifyOTP" element={<PublicOnlyRoute><OTPVerify /></PublicOnlyRoute>} />

            <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path="/AboutMe" element={<PrivateRoute><AboutMe /></PrivateRoute>} />
            <Route path="/Links" element={<PrivateRoute><Links /></PrivateRoute>} />
            <Route path="/Post/:postId" element={<PrivateRoute><Post /></PrivateRoute>} />
            <Route path="/CreatePost" element={<PrivateRoute><CreatePost /></PrivateRoute>} />
            <Route path="*" element={<PrivateRoute><PageNotFound /></PrivateRoute>} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
