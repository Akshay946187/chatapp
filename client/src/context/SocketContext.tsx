import { RootState } from '@/store/store';
import { createContext, useContext, useEffect, useRef, ReactNode } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { io, Socket } from 'socket.io-client';
import { addMessage } from '@/store/slices/chatSlice';

interface SocketProviderProps {
  children: ReactNode;
}

const SocketContext = createContext<Socket | null>(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }: SocketProviderProps) => {
  const socket = useRef<Socket | null>(null);
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const { selectedChatData, selectedChatType } = useSelector((state: RootState) => state.chat);

  useEffect(() => {
    if (userInfo) {
      socket.current = io("http://localhost:8000", {
        withCredentials: true,
        query: { userId: userInfo.id },
      });
  
      socket.current.on('connect', () => {
        console.log('Connected to socket server');
      });
  
      socket.current.on('connect_error', (error) => {
        console.error('Socket connection error:', error);
      });
  
      socket.current.on('disconnect', () => {
        console.log('Socket disconnected');
      });
  
      socket.current.on('receiveMessage', (message) => {
        console.log("Dispatching addMessage with:", message);
        dispatch(addMessage(message));
      });
  
      return () => {
        if (socket.current) {
          socket.current.off('receiveMessage');
          socket.current.disconnect();
        }
      };
    }
  }, [userInfo, dispatch]);
  

  return (
    <SocketContext.Provider value={socket.current}>
      {children}
    </SocketContext.Provider>
  );
};


