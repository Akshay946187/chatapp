import { RootState } from '@/store/store'
import { profile } from '@/types/user'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IoArrowBack } from 'react-icons/io5'
import {FaPlus,FaTrash} from 'react-icons/fa'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import axios from 'axios'
import { host } from '@/utils/constants'
import { setUserInfo } from '@/store/slices/authSlice'
import { useNavigate } from 'react-router-dom'


const Profile = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [profile, setProfile] = useState<profile>({
    firstName: '',
    lastName: '',
    image: '',
    hovered: false
  })
const handleNavigate = ()=>{
  if(userInfo.profileSetup){
    navigate('/chat')
  }else{
    toast.error('setup your profile first')
  }
}
  const validateProfile = ()=>{
    if(!profile.firstName || !profile.lastName){
      toast('all fileds are required')
      return false
    }
    return true
  }

  function handleInput(e){
      const {name,value} = e.target
      setProfile({
        ...profile,[name]:value
      })
  }
  async function saveChanges(){
      if(validateProfile()){
        try {
          const response = await axios.post(`${host}/update-profile`,profile,{withCredentials:true})
          if(response.status === 200){
            dispatch(setUserInfo(response.data.user))
            toast.success("profile setup sucssfully")
            navigate('/chat')
          }
        } catch (error) {
          console.log(error)
        }
      }
  }


  return (
    <div className='bg-[#1b1c24] min-h-[100vh] flex items-center justify-center flex-col gap-10'>
      <div className='flex flex-col gap-10 w-[80vw] md:w-max mx-auto'>
        <div>
          <IoArrowBack className='text-3xl sm:text-5xl text-white/90 cursor-pointer' onClick={handleNavigate} />
        </div>
        <div className="grid grid-cols-2">
          <div className='h-full w-32 md:w-48 relative flex items-center justify-center'
            onMouseEnter={() => setProfile((prevProfile) => ({ ...prevProfile, hovered: true }))}
            onMouseLeave={() => setProfile((prevProfile) => ({ ...prevProfile, hovered: false }))}
          >
            <Avatar className="h-32 w-32 md:w-44 md:h-44 rounded-full overflow-hidden">
              {
                profile.image ? <AvatarImage src={profile.image || "https://github.com/shadcn.png"} />: <AvatarFallback className='text-2xl font-bold uppercase sm:text-3xl'>{userInfo.email.split('@')[0]}</AvatarFallback>
              }
            </Avatar>
            {
              profile.hovered && <div className='absolute inset-0 flex items-center justify-center bg-black/50 rounded-full'>{profile.image ?
                 <FaTrash size={32} className='text-white cursor-pointer'/>
                 :<FaPlus size={32} className='text-white cursor-pointer'/>}
                 </div>
            }
          </div>
          {/* inputelements */}
          <div className='min-w-32 md:min-h-64 flex flex-col gap-6 text-white justify-center items-center'>
            <div className='w-full'>
              <Input 
              placeholder='Email'
              value={userInfo.email}
              disabled
              className='rounded-lg p-5 bg-[#2c2e3b] border-none'
              />
            </div>
            <div className='w-full'>
              <Input 
               type='text'
              placeholder='first name'
              value={profile.firstName}
              name='firstName'
              onChange={handleInput}
              className='rounded-lg p-5 bg-[#2c2e3b] border-none'
              />
            </div>
            <div className='w-full'>
              <Input 
              type='text'
              placeholder='first name'
              value={profile.lastName}
              name='lastName'
              onChange={handleInput}
              className='rounded-lg p-5 bg-[#2c2e3b] border-none'
              />
            </div>
            
            
          </div>
          {/* inputelements */}
        </div>
       
      </div>
      <div>
        <Button onClick={saveChanges} className='w-full bg-purple-600 hover:bg-purple-900'>Save Changes</Button>
      </div>
    </div>
  )
}

export default Profile
