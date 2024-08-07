import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedChatType: undefined,
  selectedChatData: undefined,
  directMessageContects:[],
  selectedChatMessage: [],
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setSelectedChatType: (state, action) => {
      state.selectedChatType = action.payload;
    },
    setSelectedChatData: (state, action) => {
      state.selectedChatData = action.payload;
    },
    setSelectedChatMessage: (state, action) => {
      state.selectedChatMessage = action.payload;
    },
    setDirectMessageContects: (state, action) => {
      const exId = state.directMessageContects.map(item => item._id);
      const newContacts = action.payload.filter(item => !exId.includes(item._id));
      state.directMessageContects.push(...newContacts);
    },
    
    closeChat: (state) => {
      state.selectedChatType = undefined;
      state.selectedChatData = undefined;
      state.selectedChatMessage = [];
    },
    addMessage: (state, action) => {
      const message = action.payload;
      state.selectedChatMessage.push({
        ...message,
        recipient: state.selectedChatType === "channel" ? message.recipient : message.recipient._id,
        sender: state.selectedChatType === "channel" ? message.sender : message.sender._id,
      });
    },
  },
});
 
export const {
  setSelectedChatType,
  setSelectedChatData,
  setSelectedChatMessage,
  closeChat,
  addMessage,
  setDirectMessageContects
} = chatSlice.actions;

export default chatSlice.reducer;























// justand slice  
// createChatslice = (set,get)=>({
//     selectedChatType:undefined,
//     selectedChatData:undefined,
//     selectedChatMessage:[],
//     setselectedchattype:(selectedChatType)=>set({selectedChatType}),
//     setselectedchatdata:(selectedChatData)=>set({selectedChatData}),
//     setselectedChatMessage:(selectedChatMessage)=>set({selectedChatMessage}),
//     closeChat:()=>set({
//         selectedChatType:undefined,
//         selectedChatData:undefined,
//         selectedChatMessage:[]
//     }),
//     addMessage:(message)=>{
//         const selectedChatMessage=get().selectedChatMessage;
//         const selectedChatType=get().selectedChatType;

//         set({
//             selectedChatMessage:[
//                 ...selectedChatMessage,{
//                     ...message,
//                     recipient:selectedChatType==="channel"?message.recipient:message.recipient._id,
//                     sender:selectedChatType==="channel"?message.sender:message.sender._id,
//                 }
//             ]
//         })
//     }
// })