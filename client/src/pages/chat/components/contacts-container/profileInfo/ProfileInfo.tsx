import { RootState } from '@/store/store'
import { Avatar, AvatarFallback } from '@radix-ui/react-avatar'
import {FaEdit} from 'react-icons/fa'
import {IoPowerSharp} from 'react-icons/io5'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { host } from '@/utils/constants'
import { setUserInfo } from '@/store/slices/authSlice'




const ProfileInfo = () => {
    const {userInfo} = useSelector((state:RootState)=>state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()


    const logout = async()=>{
      const response = await axios.post(`${host}/logout`,{},{withCredentials:true})
      if(response.status === 200){
        dispatch(setUserInfo(null))
        navigate('/auth')
      }
    }
  return (
    <div className='absolute bottom-0 flex items-center justify-center gap-6 px-6 min-h-[15vh] bg-black/50 w-full'>
      <div>
      <Avatar className="h-12 w-12 md:w-44 bg-purple-600 text-black p-3 rounded-full overflow-hidden">
             
                <AvatarFallback className='text-2xl font-bold uppercase sm:text-3xl'>{userInfo.email.split('')[0]}</AvatarFallback>
              
            </Avatar>
      </div>
      <div className='flex items-center justify-center gap-1'>
        <h1>{userInfo.firstName}</h1>
        <h1>{userInfo.lastName}</h1>
      </div>
      <div onClick={()=>navigate('/profile')}>
    <div className='flex items-center justify-center gap-2'>
    <TooltipProvider>
  <Tooltip>
    <TooltipTrigger>
      <FaEdit className='text-xl text-purple-600'/>
    </TooltipTrigger>
    <TooltipContent>
      <p>Edit Profile</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
{/* logout  */}
<TooltipProvider >
  <Tooltip>
    <TooltipTrigger>
    <IoPowerSharp className='text-xl text-red-600' onClick={logout}/>
    </TooltipTrigger>
    <TooltipContent>
      <p>Logout</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
    </div>

      </div>
    </div>
  )
}

export default ProfileInfo
