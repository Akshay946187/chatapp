import { Input } from '@/components/ui/input';
import { useSocket } from '@/context/SocketContext';
import { RootState } from '@/store/store';
import { host } from '@/utils/constants';
import axios from 'axios';
import React, { useRef, useState } from 'react';
import { GrAttachment } from 'react-icons/gr';
import { IoSend } from 'react-icons/io5';
import { RiEmojiStickerLine } from 'react-icons/ri';
import { useSelector } from 'react-redux';

const MessageBat = () => {
  const socket = useSocket();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState('');
  const { selectedChatData, selectedChatType } = useSelector((state: RootState) => state.chat);
  const { userInfo } = useSelector((state: RootState) => state.auth);

  const sendMessage = async () => {
    if (socket) {
      socket.emit("sendMessage", {
        sender: userInfo.id,
        content: message,
        recipient: selectedChatData._id,
        messageType: 'text',
        fileUrl: undefined
      });
    } else {
      console.log('Socket is not connected');
    }

    setMessage('')
  };
  

  const handleAttchement = ()=>{
    if(fileInputRef.current){
      fileInputRef.current.click()
    }
  }

  const handleAttchementChange = async (e:React.ChangeEvent<HTMLInputElement>)=>{
    try {
      const file = e.target.files ? e.target.files[0]:''
      if(file){
        const formData = new FormData()
        formData.append('file',file)
        const response = await axios.post(`${host}/message//upload-file`,formData,{withCredentials:true})
        console.log(response)
        socket.emit("sendMessage", {
          sender: userInfo.id,
          content: undefined,
          recipient: selectedChatData._id,
          messageType: 'file',
          fileUrl: response.data.filePath
        });
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='h-[10vh] bg-[#1c1d25] flex justify-center items-center gap-6 px-6'>
      <div className='flex-1 flex bg-[#2a2b33] rounded-md items-center gap-5 pr-5'>
        <Input
          type='text'
          placeholder='Message'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className='text-white bg-transparent w-full rounded-md border-none focus:outline-neutral-300'
        />
        <button className='flex items-center justify-center' onClick={handleAttchement}>
          <GrAttachment className='text-2xl '/>
        </button>
        <input type="file" className='hidden' ref={fileInputRef} onChange={handleAttchementChange}/>
      </div>
      <button className='flex items-center justify-center bg-purple-600 p-2 rounded-md' onClick={sendMessage}>
        <IoSend className='text-2xl'/>
      </button>
    </div>
  );
};

export default MessageBat;
