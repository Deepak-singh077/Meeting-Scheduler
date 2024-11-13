import { Button } from '@/components/ui/button'
import React from 'react'
import Link from 'next/link'

const Hero = () => {
  return (
    <div className='flex flex-col items-center justify-center my-20'>
<div className='text-center max-w-3xl'>
<h2 className='font-bold text-[60px] text-slate-700'>Easy scheduling ahead</h2>
   <h2 className='text-xl mt-5 text-slate-500 '>Scheduly is youe scheduling automation for eliminaating the back-and-forth emails to find the perfect time -- and so much more</h2>
   <div className='flex gap-4 flex-col mt-5 '>
    <h3 className='text-sm'> Sign up free with Google and facebook </h3>
  <div className='flex justify-center gap-8'>
          <Button className='p-7 flex gap-4'>
            <img src="/google.png" alt="google" width={40} height={40}/>
            Signup with Google</Button>
          <Button className='flex p-7 gap-4' >
          <img src="/facebook.png" alt="facebook" width={40} height={40}/>
            Signup with Facebook</Button>
       </div>
       <hr></hr>
       <h2><Link  href='' className='text-primary'>Sign up with email</Link> No Credit Card required</h2>
   </div>
   </div>  

      </div>
  )
}

export default Hero