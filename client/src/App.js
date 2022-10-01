import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from '../src/pages/Home'
import { Feed } from './pages/Feed';
import { Newsletter } from './pages/Newsletter';
import { Signup } from './pages/Signup'
import { Login } from './pages/Login'
import { Profile } from './pages/Profile'
import { Errorpage } from './pages/Errorpage'
import './App.css'
import { Myquotes } from './pages/Myquotes';
import { Privateroutes } from './component/Privateroutes';
import { UserProfile } from './pages/UserProfile';



function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} >
          <Route index element={<Feed />} />
          <Route path='newsletter' element={<Newsletter />} />
          <Route path='signup' element={<Signup />} />
          <Route path='login' element={<Login />} />
          <Route element={<Privateroutes />}>
            <Route path='profile' element={<Profile />} />
            <Route path='Myquotes' element={<Myquotes />} />
          </Route>
          <Route path='/user/:id' element={<UserProfile />}/>
          <Route path='*' element={<Errorpage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
