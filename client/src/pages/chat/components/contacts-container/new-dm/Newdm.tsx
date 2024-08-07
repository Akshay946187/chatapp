import React, { useState } from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { FaPlus } from 'react-icons/fa'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import axios from 'axios'
import { host } from '@/utils/constants'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Contact } from '@/types/user'
import {setSelectedChatData,setSelectedChatType} from '@/store/slices/chatSlice'
import { useDispatch } from 'react-redux'


const Newdm = () => {
  const [openNewContact, setopenNewContect] = useState(false)
  const [searchContacts, setSearchContacts] = useState<Contact[]>([])
  const dispatch = useDispatch()

  const searchContact = async (searchTerm: string) => {
    try {
      if (searchTerm.length > 0) {
        const response = await axios.post(`${host}/contacts/search`, { searchTerm }, { withCredentials: true })
        if (response.status === 200 && response.data.contacts) {
          setSearchContacts(response.data.contacts)
        }
      } else {
        setSearchContacts([])
      }

    } catch (error) {
      console.log({ error })
    }
  }
  const selectNewContact = (contact:Contact)=>{
    setopenNewContect(false)
    dispatch(setSelectedChatType("contact"))
    dispatch(setSelectedChatData(contact))
    setSearchContacts([])
  }
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <FaPlus className='text-xl text-purple-900'
              onClick={() => setopenNewContect(true)}
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>Select new contact</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      {/* dilogcom */}
      <Dialog open={openNewContact} onOpenChange={setopenNewContect}>

        <DialogContent className='bg-[#1c1e1b] border-none text-white min-w-[400px] min-h-[400px] flex flex-col items-center '>
          <DialogHeader>
            <DialogTitle>Select your Contact</DialogTitle>
            <DialogDescription>

            </DialogDescription>
          </DialogHeader>
          <div>
            <Input
              placeholder='Search contact'
              type='text'
              className='bg-[#2c2e3b] border-none px-6'
              onChange={(e) => searchContact(e.target.value)}
            />
          </div>
          <ScrollArea className="h-[200px] w-[250px] rounded-md border p-4">
            <div className='flex flex-col gap-6'>
              {
                searchContacts.map((contact) => (
                  <div key={contact._id} className='flex items-center gap-3 cursor-pointer' onClick={()=>selectNewContact(contact)}>

                    <Avatar className="h-12 w-12  bg-purple-600 text-black p-3 rounded-full overflow-hidden">
                      <AvatarFallback className='text-2xl font-bold uppercase sm:text-3xl'>{contact.email.split('')[0]}</AvatarFallback>
                    </Avatar>
                    <div className='flex flex-col  items-center justify-center gap-1'>
                     <div className='flex  items-center justify-center gap-1'>
                     <h1>{contact.firstName}</h1>
                     <h1>{contact.lastName}</h1>
                     </div>
                     <div>{contact.email}</div>
                    </div>
                  </div>
                ))
              }
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

    </>
  )
}

export default Newdm
