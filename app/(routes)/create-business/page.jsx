'use client'
import { Button } from '@/components/ui/button';
import { toast } from "sonner"
import { Input } from '@/components/ui/input';
import { app } from '@/config/FirebaseConfig';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import Image from 'next/image';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const createBusiness = () => {
  const [businessName, setBusinessName] = useState('');
 const db =getFirestore(app);
 const {user} =useKindeBrowserClient();

 const router= useRouter();


  const onCreateBusiness= async()=>{
   
    await setDoc(doc(db,'Business',user.email),{
      businessName:businessName,
      email:user.email,
      userName:user.given_name+" "+user.family_name
    }).then(res=>{
      
      toast("NEw Business Created !");
      router.replace('/dashboard');
    })
  }
  return (
    <div className='p-14 items-center flex flex-col gap-20 my-10'>
      <Image src="/logo.svg" width={150} height={150} alt="" />
      <div className='flex flex-col items-center gap-4 max-w-3xl'>
        <h2 className='text-4xl font-bold'>What should we call your business?</h2>
        <p className='text-slate-500'>You can always change this later from settings.</p>
        <div className='w-full'>
          <label htmlFor="" className='text-slate-400'>Team Name</label>
          <Input placeholder="e.g H&M" className="mt-2" 
            onChange={(e) => setBusinessName(e.target.value)}
          />
        </div>
        <Button 
        disabled={!businessName}
        onClick={onCreateBusiness}
        className='w-full'>Create Business</Button>
      </div>
    </div>
  )
}

export default createBusiness;