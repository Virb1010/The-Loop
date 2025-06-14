import './App.css';
import { Link, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'
import AboutMe from './pages/AboutMe'
import Links from './pages/Links'
import Dock from './components/Dock';
import Post from './pages/Post';
import PageNotFound from './pages/PageNotFound';
import SignUpPage from './pages/SignUpPage';

function App() {
  return (
    <div className='App'>
      <Dock/>
      <Router>
        <Routes>
          <Route path='/Welcome' Component={SignUpPage} />
          <Route path='/' Component={Home} />
          <Route path='/AboutMe' Component={AboutMe} />
          <Route path='/Links' Component={Links} />
          <Route path='/Post/:postId' Component={Post} />
          <Route path='/*' Component={PageNotFound} />
        </Routes>
      </Router>
    </div>)
}

export default App;
