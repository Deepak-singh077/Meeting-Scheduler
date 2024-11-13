'use client'
import DaysList from '@/app/_utils/DaysList';
import { Button } from '@/components/ui/button';
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from '@/components/ui/input';
import { app } from '@/config/FirebaseConfig';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { collection, doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore';

import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';

const Availability = () => {
    const [daysAvailable ,setDaysAvailable]=useState(
        {
        Sunday:false,
        },
        {
            Monday:false,
        },{
            Tuesday:false,
        },{
            Wednesday:false,
        },{
            Thursday:false,
        },{
            Friday:false,
        },{
            Saturday:false,
        },
    
    );
    const [startTime,setStartTime]=useState('');
    const [endTime,setEndTime]=useState('');
    const db = getFirestore(app);
    const {user}=useKindeBrowserClient();

    useEffect(()=>{
    user&&getBusinessInfo();
    },[user])

  const getBusinessInfo=async()=>{
    const docRef =doc(db,'Busiess',user.email);
    const docSnap= await getDoc(docRef);
    const result= docSnap.data();
    setDaysAvailable(result.daysAvailable);
    setStartTime(result.startTime);
    setEndTime(result.endTime);
  }

    const onhandleChange=(day,value)=>{
       setDaysAvailable({
        ...daysAvailable,
        [day]:value
       })
       console.log(daysAvailable)
    }
    const handleSave=async()=>{
        console.log(daysAvailable,startTime,endTime);
        if (!user?.email) return;
        const docref=doc(db,'Business',user.email)
        await updateDoc(docref,{
            daysAvailable:daysAvailable,
            startTime:startTime,
            endTime:endTime
        }).then(resp=>{
            console.log('data updated!');
            toast("data updated")
        })
    }
  return (
    <div className='ml-10'>
        <h2 className='font-bold text-2xl '>Availability</h2>
        <hr className='my-7' />
         <div>
            <h2 className='font-bold '>Available days</h2>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-5 my-3'>
                {
                    DaysList.map((days,index)=>(
                        <div key={index}>
                         <h2> <Checkbox
                         checked={daysAvailable[days.day]?daysAvailable[days.day]:false}
                         onCheckChange={(e)=>onhandleChange(days.day,e.target.checked)}
                         />{days.day}</h2>
                        </div>
                    ))
                }
            </div>
         </div>
         <div>

         <h2 className='font-bold mt-10'>Available Time</h2>
         <div className='flex gap-10'>
           <div className='mt-3'>
            <h2>start time</h2>
            <Input type='time'
             defaultValue={startTime}
            onChange={(e)=>setStartTime(e.target.value) }/>
           </div>
           <div className='mt-3'>
            <h2>End time</h2>
            <Input type='time'
            defaultValue={endTime}
            onChange={(e)=>setEndTime(e.target.value) } />
           </div>
           </div>
         </div>
         <Button onClick={handleSave}
         >Save</Button>
    </div>
  )
}

export default Availability;