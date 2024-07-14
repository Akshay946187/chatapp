import React, { ChangeEvent, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserType } from '@/types/user'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'


const Auth = () => {
  const [userData,setuserData] = useState<UserType>({
    email:'',
    password:'',
    confirmPassword:''
  })

  function handleChange(e:ChangeEvent<HTMLInputElement>){
       const {name,value}= e.target
       setuserData({
        ...userData,
        [name]:value
       })
  }

  function handleSubmit(){
    console.log(userData)
    setuserData({
      email:'',
      password:'',
      confirmPassword:''
    })
  }
  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <div className='w-[70vh] h-[70vh] flex items-center justify-center flex-col bg-slate-100 shadow-md rounded-md gap-3 sm:gap-5'>
        <div className='text-center space-y-2'>
          <h1 className='text-xl sm:text-2xl font-bold'>Welcome</h1>
          <p className='text-sm'>fill your detail's to get started with the <span className='font-bold text-purple-900'>best chat app</span></p>
        </div>
        <div className='flex items-center justify-center w-full'>
          <Tabs defaultValue="login" className="text-center w-3/4 space-y-6">
            <TabsList className='w-full space-x-6  bg-transparent rounded-none '>
              <TabsTrigger value="login"
              className='p-3 border-b-2 data-[state=active]: bg-transparent text-black  w-full data-[state=active]:border-b-purple-600 rounded-none transition-all duration-300'
              >Login</TabsTrigger>
              <TabsTrigger value="signup"
              className='p-3 border-b-2 data-[state=active]: bg-transparent text-black  w-full data-[state=active]:border-b-purple-600 rounded-none transition-all duration-300'
              >Signup</TabsTrigger>
            </TabsList>
            <TabsContent value="login" className='flex flex-col items-center justify-center gap-3'>
              <Input
              type='email'
              name='email'
              placeholder='Enter your email'
              value={userData.email}
              onChange={handleChange}
              className='rounded-full p-6'
              
              />
              <Input
              type='password'
              name='password'
              placeholder='Enter your passward'
              value={userData.password}
              onChange={handleChange}
              className='rounded-full p-6'
              />
              
              <Button>Login</Button>
            </TabsContent>
            <TabsContent value="signup" className='flex flex-col items-center justify-center gap-3'>
            <Input
              type='email'
              name='email'
              placeholder='Enter your email'
              value={userData.email}
              onChange={handleChange}
              className='rounded-full p-6'
              
              />
              <Input
              type='text'
              name='password'
              placeholder='Enter your passward'
              value={userData.password}
              onChange={handleChange}
              className='rounded-full p-6'
              />
              <Input
              type='text'
              name='confirmPassword'
              placeholder='confirmPassword'
              value={userData.confirmPassword}
              onChange={handleChange}
              className='rounded-full p-6'
              />
              <Button onClick={handleSubmit}>Singup</Button>
            </TabsContent>
          </Tabs>


        </div>

      </div>
    </div>
  )
}

export default Auth
