import React, { ReactNode, useEffect, useState } from 'react'
import { Button } from "./components/ui/button"
import { BrowserRouter, Routes,Route, Navigate } from 'react-router-dom'
import Auth from './pages/auth'
import Chat from './pages/chat'
import Profile from './pages/profile'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './store/store'
import axios from 'axios'
import { host } from './utils/constants'
import { setUserInfo } from './store/slices/authSlice'

// Define props type for PrivateRoute
interface PrivateRouteProps {
  children: ReactNode;
}
const PriviateRoute:React.FC<PrivateRouteProps> = ({children})=>{
  const {userInfo} = useSelector((state:RootState)=>state.auth)
  const isAuthenticated =!! userInfo
  return isAuthenticated ? children:<Navigate to="/auth"/>
}

const AuthRoute:React.FC<PrivateRouteProps> = ({children})=>{
  const {userInfo} = useSelector((state:RootState)=>state.auth)
  const isAuthenticated =!! userInfo
  return isAuthenticated ?<Navigate to="/chat"/>: children
}

function App() {
  const dispatch = useDispatch()

  const {userInfo} = useSelector((state:RootState)=>state.auth)
  // console.log(userInfo.id)
  
  const [loading,setLoading] = useState(true)

  useEffect(()=>{
    const getUserData = async()=>{
      try {
        const response = await axios.get(`${host}/user-info`,{withCredentials:true})
       
        if(response.status === 200 && response.data.user.id){
            dispatch(setUserInfo(response.data.user))
        }else{
          response.data.user = undefined
        }
      } catch (error) {
        console.log(error)
      }finally{
        setLoading(false)
      }
    }
    if(!userInfo){
      getUserData()
    }else{
      setLoading(false)
    }
  },[userInfo])

  if(loading){
    return <div className='text-2xl font-bold min-h-screen flex items-center justify-center'>Loading...</div>
  }
 
  
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
