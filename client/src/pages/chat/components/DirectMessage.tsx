import { RootState } from '@/store/store'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedChatData, setSelectedChatMessage, setSelectedChatType } from '@/store/slices/chatSlice'
import { Avatar } from '@radix-ui/react-avatar'
import { AvatarFallback } from '@/components/ui/avatar'

const DirectMessage = () => {
  const { directMessageContects, selectedChatData } = useSelector((state: RootState) => state.chat)
  const dispatch = useDispatch()

  const handleClick = (contact) => {
    if (selectedChatData && selectedChatData._id !== contact._id) {
      dispatch(setSelectedChatMessage([]))
    }
    dispatch(setSelectedChatType("contact"))
    dispatch(setSelectedChatData(contact))
  }

  return (
    <div className='mt-5 max-h-[250px] px-2'>
      {directMessageContects.map((contact) => (
        <div key={contact._id} className='flex items-center gap-2 mt-6 cursor-pointer' onClick={() => handleClick(contact)}>
          <div className='flex items-center justify-center gap-2'>
            <Avatar className="h-2 w-2 bg-purple-600 text-black p-5 rounded-full overflow-hidden">
              <AvatarFallback className='text-xl font-bold uppercase sm:text-2xl'>
                {contact.firstName ? contact.firstName[0] : contact.email[0]}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className='flex items-center justify-center gap-1'>
            {contact.firstName ? <h1>{contact.firstName}</h1> : <h1>{contact.email}</h1>}
          </div>
        </div>
      ))}
    </div>
  )
}

export default DirectMessage
