'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LocationObject from "@/app/_utils/LocationObject";
import Image from "next/image";
import Link from "next/link";
import themeColors from "@/app/_utils/Theme.jsx";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { app } from "@/config/FirebaseConfig";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const MeetingForm = ({setFormValue}) => {
  const [themeColor, setThemeColor] = useState();
  const [eventName, setEventName] = useState('');
  const [duration, setDuration] = useState(30);
  const [locationType, setLocationType] = useState();
  const [locationUrl, setLocationUrl] = useState('');
  const db =getFirestore(app)
  const {user}=useKindeBrowserClient();
  const router= useRouter();


  useEffect(()=>{
 setFormValue({
  eventName:eventName,
  duration:duration,
  locationType:locationType,
  locationUrl:locationUrl,
  themeColor:themeColor
 })
  },[eventName,duration,locationType,locationUrl,themeColor])

  const handleEventNameChange = (e) => setEventName(e.target.value);
  const handleDurationChange = (newDuration) => setDuration(newDuration);
  const handleLocationTypeChange = (newLocationType) => setLocationType(newLocationType);
  const handleLocationUrlChange = (e) => setLocationUrl(e.target.value);
  const handleThemeColorChange = (newThemeColor) => setThemeColor(newThemeColor);
  
  const onCreateClick=async()=>{
    const id= Date.now().toString();
    try {
      await setDoc(doc(db,'MeetingEvent',id),{
         id:id,
         eventName:eventName,
         duration:duration,
         locationType:locationType,
         locationUrl:locationUrl,
         themeColor:themeColor,
         businessId:doc(db,'Business',user?.email),
         createdBy:user?.email
      }).then(res=>{
        toast('New Meeting Event Created');
        router.replace('/dashboard/meeting-type')
      })
    } catch (error) {
      console.error("Error creating meeting event:", error);
      toast('Failed to create Meeting Event');
    }
  }
  
  return (
    <div className="p-8">
      <Link href={'/dashboard'}><h2 className="flex gap-2">
          <ChevronLeft /> cancel
        </h2>
      </Link>
      <div className="mt-4">
        <h2 className="font-bold text-2xl my-4">Create New Event</h2>
        <hr />
      </div>
      <div className="flex flex-col gap-3 my-4">
        <h2 className="font-bold">Event Name * </h2>
        <Input placeholder="Name of your Meeting"
        onChange={handleEventNameChange}
        />
        <h2 className="font-bold">Duration</h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="max-w-40">
              {duration} Min
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => handleDurationChange(15)}>15 Min</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDurationChange(30)}>30 Min</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDurationChange(45)}>45 Min</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDurationChange(60)}>50 Min</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <h2 className="font-bold">Location *</h2>
        <div className="grid grid-cols-4 gap-3">
          {
            LocationObject.map((option, index) => (
                <div key={index} className={`border flex flex-col cursor-pointer items-center justify-center p-3 rounded-lg hover:bg-blue-100 hover:border-primary ${locationType === option.name && 'bg-blue-100 border-primary'} `}
                 onClick={() => handleLocationTypeChange(option.name)}
                >
                    <Image src={option.icon} width={30} height={30} alt={option.name} />
                    <h2>{option.name}</h2>
                </div>
            ))
          }
        </div>
        
        {locationType && (
          <>
            <h2 className="font-bold"> Add {locationType} Url </h2>
            <Input placeholder='Add Url'
            onChange={handleLocationUrlChange}
            />
          </>
        )}
        <div>
          <h2 className="font-bold">Select theme color</h2>
          <div className="flex justify-evenly">
            {
              themeColors.map((color, index) => (
                 <div key={index} className={`h-7 w-7 rounded-full ${themeColor === color && 'border-4 border-black'} `}
                  style={{ backgroundColor: color }}
                  onClick={() => handleThemeColorChange(color)}
                 >
                 </div>
              ))
            }
          </div>
        </div>
      </div>
      <Button className='w-full mt-9' 
      disabled={(!eventName || !duration || !locationType || !locationUrl)}
      onClick={()=>onCreateClick()}
      >Create</Button>
    </div>
  );
};

export default MeetingForm;
