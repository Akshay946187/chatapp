import { setSelectedChatMessage } from '@/store/slices/chatSlice';
import { RootState } from '@/store/store';
import { host } from '@/utils/constants';
import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {MdFolderZip} from 'react-icons/md'
import {IoMdArrowDown} from 'react-icons/io'

const MessageContainer = () => {
  const dispatch = useDispatch();
  const scrollRef = useRef<HTMLDivElement>(null);
  const { selectedChatData, selectedChatType, selectedChatMessage } = useSelector((state: RootState) => state.chat);
  const { userInfo } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const getMessage = async () => {
      try {
        const response = await axios.post(`${host}/message/get-message`, { id: selectedChatData._id }, { withCredentials: true });
        console.log(response);
        if (response.data) {
          dispatch(setSelectedChatMessage(response.data.messages));
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (selectedChatData._id && selectedChatType === "contact") {
      getMessage();
    }
  }, [selectedChatData, selectedChatType, dispatch]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedChatMessage]);

  const checkImage = (filePath) => {
    const imageRegex = /\.(jpg|jpeg|png|gif|bmp|webp|tiff)$/i;
    return imageRegex.test(filePath);
  };

  const renderMessage = () => {
    let lastDate = null;
    return selectedChatMessage.map((message) => {
      const messageDate = moment(message.timestamp).format("YYYY-MM-DD");
      const showDate = messageDate !== lastDate;
      lastDate = messageDate;

      return (
        <div key={message._id}>
          {showDate && (
            <div className='text-center text-gray-500 my-2'>
              {moment(message.timestamp).format("LL")}
            </div>
          )}
          {selectedChatType === "contact" && renderDMMessage(message)}
        </div>
      );
    });
  };

  const renderDMMessage = (message: any): React.ReactNode => {
    const imgUrl = `http://localhost:8000/${message.fileUrl}`
    const handleDownload = (fileUrl) => {
      const url = `http://localhost:8000/${fileUrl}`;
      const link = document.createElement('a');
      link.href = url;
      link.download = fileUrl.split('/').pop(); // Use the filename from the URL
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    return (
      <div className={`${message.sender === selectedChatData._id ? "text-left" : "text-right"}`}>
        {message.messageType === "text" && (
          <div className={`inline-block p-2 rounded-md ${message.sender !== selectedChatData._id ? "bg-pink-900 text-white border-2" : "bg-black text-white border-2"}`}>
            {message.content}
          </div>
        )}
        {message.messageType === "file" && (
          <div className={`inline-block p-2 rounded-md ${message.sender !== selectedChatData._id ? "bg-pink-300 text-white border-2" : "bg-black text-white border-2"}`}>
            {checkImage(message.fileUrl) ? (
              <div className='cursor-pointer'>
                <img src={imgUrl} alt="Uploaded file" height={300} width={300} />
              </div>
            ) : (
              <div className='flex items-center justify-center gap-3 cursor-pointer'>
                <span className='text-white text-2xl bg-black rounded-full p-4'>
                  <MdFolderZip/>
                </span>
                <span>{message.fileUrl.split('/').pop()}</span>
                <span className='text-2xl text-white bg-black rounded-full p-2' onClick={()=>handleDownload(message.fileUrl)}>
                  <IoMdArrowDown/>
                </span>
                </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className='flex-1 overflow-y-auto scrollbar-hidden p-4 px-8 md:w-[65vw] lg:w-[70vw] w-full'>
      {renderMessage()}
      <div ref={scrollRef} />
    </div>
  );
};

export default MessageContainer;
