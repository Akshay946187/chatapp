import React, { useEffect } from 'react'
import ProfileInfo from './profileInfo/ProfileInfo'
import Newdm from './new-dm/Newdm'
import axios from 'axios'
import { host } from '@/utils/constants'
import { useDispatch } from 'react-redux'
import { setDirectMessageContects } from '@/store/slices/chatSlice'
import DirectMessage from '../DirectMessage'


const Contact = () => {
const dispatch = useDispatch()
useEffect(()=>{
  const getContacts = async ()=>{
    try {
      const response = await axios.get(`${host}/contacts/getdm-list`,{withCredentials:true})
      if(response.status === 200){
        console.log(response.data.contacts)
        dispatch(setDirectMessageContects(response.data.contacts))
      }
    } catch (error) {
      console.log(error)
    }
   }
   getContacts()
},[])

  return (
    <div className="relative md:w-[35vw] lg:w-[30vw] bg-[#1b1c24] border-r-2 border-[#1cb224] w-full">
     <div className='p-3'>
      <h1 className='text-2xl font-bold sm:text-3xl'><span className='text-purple-900 text-2xl font-bold sm:text-3xl'>SY</span>Chat</h1>
     </div>
     <div className='my-6'>
      <div className="flex items-center justify-between pr-10 w-[95%] mx-auto">
        <p className='text-opacity-60 text-sm first-line:'>Direct Messages</p>
        <Newdm/>
      </div>
      <div className='max-h-[38vh] overflow-y-auto scrollbar-hidden'>
            <DirectMessage />
      </div>
     </div>
     <div className='my-6'>
      <div className="flex items-center justify-start w-[95%] mx-auto pr-10">
        <p className='text-opacity-60 text-sm first-line:'>Chanels</p>
      </div>
     </div>
     <ProfileInfo/>

    </div>
  )
}

export default Contact
