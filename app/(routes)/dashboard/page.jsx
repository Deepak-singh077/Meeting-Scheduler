"use client";
import React, { useEffect, useState } from "react";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { app } from "@/config/FirebaseConfig";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useRouter } from "next/navigation";
import MeetingType from "./meeting-type/page";

const dashboard = () => {
  const db = getFirestore(app);
  const { user } = useKindeBrowserClient();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const isBusinessRegistered = async () => {
    if (!user?.email) return;

    const docRef = doc(db, "Business", user.email);
    try {
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setLoading(false);
      } else {
        console.log("No such document!");
        router.replace("/create-business");
      }
    } catch (error) {
      console.error("Error accessing Firestore:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      isBusinessRegistered();
    }
  }, [user]);

  if (loading) {
    return
     <h2>Loading....</h2>;
  }

  return (
    <>
    
    <div><MeetingType/></div>
    </>
  )
  
};

export default dashboard;
