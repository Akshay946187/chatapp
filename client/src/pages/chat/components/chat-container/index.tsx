import React from 'react'
import CheatHeader from './components/CheatHeader'
import MessageContainer from './components/MessageContainer'
import MessageBat from './components/MessageBat'

const ChatContainer = () => {
  return (
    <div className='fixed top-0 h-[100vh] w-[100vw] bg-[#1c1d25] flex flex-col md:static md:flex-1'>
      <CheatHeader/>
      <MessageContainer/>
      <MessageBat/>
    </div>
  )
}

export default ChatContainer
