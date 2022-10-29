import './App.css';
import Feed from './components/feed/Feed';
import Navbar from './components/navbar/Navbar';
import Profile from './components/profile/Profile';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Setting from './components/setting/Setting';
import ProfilePage from './components/profilePage/ProfilePage';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={
          <div className='home'>
            <Feed />
            <Profile />
          </div>
        }/>
        <Route path='/setting' element={<Setting/>}/>
        <Route path='/profile' element={<ProfilePage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
