import { RootState } from '@/store/store'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import Contact from './components/contacts-container'
import EmptyChat from './components/empty-chat-container'
import ChatContainer from './components/chat-container'


const Chat = () => {
  const {userInfo} = useSelector((state:RootState)=>state.auth)
  const {selectedChatType} = useSelector((state:RootState)=>state.chat)
  const navigate = useNavigate()
  useEffect(()=>{
    if(!userInfo.profileSetup){
      toast("Please setup your Profile to procede further")
      navigate('/profile')
    }
  },[userInfo,navigate])
  return (
    <div className='h-[100vh] flex text-white overflow-hidden'>
      <Contact/>
      {
        selectedChatType === undefined ? <EmptyChat/> :<ChatContainer/>
      }
      
    </div>
  )
}

export default Chat
