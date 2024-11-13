"use client"
import React from 'react'
import Image from 'next/image';
import { Button } from "@/components/ui/button"
import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";


const Header = () => {
  return (
    <div className='flex items-center justify-between p-5 shadow-sm'>
<Image src="/logo.svg" width={100} height={100} 
  className='w-[150px] md:w-[100px]'
/>
 <ul className=' hidden md:flex gap-14 font-medium text-lg'>
    <li className='hover:text-primary transition-all duration-300 cursor-pointer'>Product</li>
    <li className='hover:text-primary transition-all duration-300 cursor-pointer'>Pricing</li>
    <li className='hover:text-primary transition-all duration-300 cursor-pointer'>COntact us</li>
    <li className='hover:text-primary transition-all duration-300 cursor-pointer'>About us</li>
 </ul>
 <div className='flex gap-5' >
 <LoginLink> <Button variant="ghost" className="border-[1px] boder-[black]">Login</Button>    </LoginLink> 
 <RegisterLink><Button >Get Started</Button></RegisterLink> 

 </div>
    </div>
  )
}

export default Header;