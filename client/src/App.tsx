import React from 'react'
import { Button } from "./components/ui/button"
import { BrowserRouter, Routes,Route, Navigate } from 'react-router-dom'
import Auth from './pages/auth'
import Chat from './pages/chat'
import Profile from './pages/profile'
import { useSelector } from 'react-redux'


const PriviateRoute = ({children})=>{
  const {userInfo} = useSelector((state)=>state.auth)
  const isAuthenticated =!! userInfo
  return isAuthenticated ? children:<Navigate to="/auth"/>
}

const AuthRoute = ({children})=>{
  const {userInfo} = useSelector((state)=>state.auth)
  const isAuthenticated =!! userInfo
  return isAuthenticated ?<Navigate to="/chat"/>: children
}

function App() {
 
  
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/auth' element={
        <AuthRoute>
          <Auth/>
        </AuthRoute>
      }/>
      <Route path='/chat' element={
        <PriviateRoute>
          <Chat/>
        </PriviateRoute>
      }/>
      <Route path='/profile' element={
        <PriviateRoute>
          <Profile/>
        </PriviateRoute>
      }/>
      <Route path='*' element={<Navigate to='/auth'/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
