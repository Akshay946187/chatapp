import React from 'react'


const EmptyChat = () => {
  return (
    <div className='flex-1 md:bg-[#1c1b25] md:flex flex-col justify-center items-center hidden duration-100 transition-all'>
     <div className='text-opacity-80 flex flex-col gap-5 items-center '>
      <h3 className='text-xl font-bold sm:text-2xl md:text-3xl'>welcome to <span className='text-purple-700'>Best Chat App</span>!</h3>

     </div>
    </div>
  )
}

export default EmptyChat
