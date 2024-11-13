'use client';
import React, { useEffect, useState } from 'react';
import { collection, doc, getDoc, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { app } from '@/config/FirebaseConfig';
import MeetingShedule from '../_components/MeetingShedule';
import { use } from 'react';

function SharedMeetingEvent({ params }) {
    const unwrappedParams = use(params);
    const db = getFirestore(app);

    const [businessInfo, setBusinessInfo] = useState(null);
    const [eventInfo, setEventInfo] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (unwrappedParams) {
            getMeetingBusinessAndEventDetails();
        }
    }, [unwrappedParams]);

    /**
     * Fetches Business Info and Event Details for the given Business Owner/User
     */
    const getMeetingBusinessAndEventDetails = async () => {
        setLoading(true);

        // Fetch business information
        const businessQuery = query(
            collection(db, 'Business'),
            where('businessName', '==', unwrappedParams.business)
        );
        const businessSnapshot = await getDocs(businessQuery);

        businessSnapshot.forEach((doc) => {
            setBusinessInfo(doc.data());
            
        });

        // Fetch event information
        const eventRef = doc(db, 'MeetingEvent', unwrappedParams.meetingEventId);
        const eventSnapshot = await getDoc(eventRef);
        setEventInfo(eventSnapshot.data());

        setLoading(false);
    };

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <MeetingShedule eventInfo={eventInfo} businessInfo={businessInfo} />
            )}
        </div>
    );
}

export default SharedMeetingEvent;
