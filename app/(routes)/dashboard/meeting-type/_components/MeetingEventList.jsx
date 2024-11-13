"use client";
import { app } from "@/config/FirebaseConfig";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  orderBy,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { Clock, Copy, Pen, Settings, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const MeetingEventList = () => {

  const db = getFirestore(app);
  const { user } = useKindeBrowserClient();
  const [eventList, setEventList] = useState([]);
  const[businessInfo,setBusinessInfo]=useState();

  useEffect(() => {
    user && getEventList();
    user&&BusinessInfo();
  }, [user]);

  const getEventList = async () => {
    try {
      setEventList([]);
      const q = query(
        collection(db, "MeetingEvent"),
        where("createdBy", "==", user?.email),
        orderBy("id", "desc")
      );
      const querySnapshot = await getDocs(q);
      const events = querySnapshot.docs.map((doc) => doc.data());
      setEventList(events);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };
const BusinessInfo=async()=>{
    const docRef =doc(db,'Business',user.email);
    const docSnap= await getDoc(docRef);
    setBusinessInfo(docSnap.data());
}
  const ondeleteMeetingEvent=async(event)=>{
    await  deleteDoc(doc(db,"MeetingEvent",event?.id)).then(res=>{
        toast('MeetingEvent Deleted');
        getEventList();
    })
  }
 const onCopyClickHandler=(event)=>{
    const meetingEventUrl= process.env.NEXT_PUBLIC_BASE_URL+'/'+businessInfo.businessName+'/'+event.id
    navigator.clipboard.writeText(meetingEventUrl);
    toast("url copied on clipboard");
 }
  return (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
      {eventList.length > 0 ? (
        eventList?.map((event, index) => (
          <div
            key={index}
            className="border shadow-md border-t-8 rounded-lg p-5 flex flex-col gap-3"
            style={{ borderTopColor: event?.themeColor }}
          >
            <div className="flex justify-end">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Settings className="cursor-pointer" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem className="flex gap-2">  <Pen /> Edit  </DropdownMenuItem>
                  <DropdownMenuItem className="flex gap-2"
                  onClick={()=>
                    ondeleteMeetingEvent(event)}>
                    <Trash /> delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <h2 className="font-medium text-xl">{event?.eventName}</h2>
            <div className="flex justify-between">
              <h2 className="flex gap-2 text-gray-500">
                <Clock /> {event?.duration}Min
              </h2>
              <h2 className="flex gap-2 text-gray-500">
                <Clock /> {event?.locationType}Min
              </h2>
            </div>
            <hr />
            <div className="flex justify-between">
              <h2
                className="flex gap-2 text-sm items-center text-primary cursor-pointer"
                onClick={() => {onCopyClickHandler(event)}}
              >
                <Copy className="h-4 w-4 " /> Copy Link
              </h2>
              <Button
                variant="outline"
                className="border-primary rounded-full text-primary"
              >
                Share
              </Button>
            </div>
          </div>
        ))
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
};

export default MeetingEventList;
