import React from 'react'
import {RiCloseFill} from 'react-icons/ri'
import {closeChat, setSelectedChatType} from '@/store/slices/chatSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { Avatar, AvatarFallback } from '@radix-ui/react-avatar'

const CheatHeader = () => {
  const {selectedChatData,selectedChatType} = useSelector((state:RootState)=>state.chat)
 const dispatch = useDispatch()
  return (
    <div className='h-[13vh] border-b-2 border-[#2f303b] flex items-center justify-between px-20'>
      <div className='flex items-center w-full justify-between overflow-hidden'>
        <div className="flex gap-3 items-center justify-center">
          <div className='bg-purple-600 rounded-full h-8 w-8 flex items-center justify-center'>
        <Avatar className="w-full   text-black   overflow-hidden text-center">
             
             <AvatarFallback className='text-2xl font-bold uppercase sm:text-3xl'>{selectedChatData.email ? selectedChatData.email.split('')[0]:""}</AvatarFallback>
           
         </Avatar>
   </div>
   <div className='flex items-center justify-center gap-1'>
     {
      selectedChatType === "contact"? selectedChatData.firstName:selectedChatData.email
     }
   </div>
        </div>
        <div className="flex items-center justify-center gap-5">
        <button className='text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all'>
          <RiCloseFill className='text-3xl' onClick={()=>dispatch(closeChat())}/>
        </button>
        </div>
      </div>

    </div>
  )
}

export default CheatHeader
