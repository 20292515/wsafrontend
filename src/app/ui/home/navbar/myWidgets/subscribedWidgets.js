'use client';
import styles from '@/app/ui/home/navbar/myWidgets/subscribedWidgets.module.css';
import Widget from '@/app/ui/home/components/widget/widget';
import React, { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";

export default function SubscribedWidgets({gateway}) {
    const { data: session } = useSession();
    const endPoint = '/GetSubscriberApps';
    const getAllApps = gateway + endPoint + '/'+ session.user.email;

    // widgets
    const [widgets, setWidgets] = useState([]);
    
    // fetch the list of all apps from the backend
    useEffect(() => {
        fetch(getAllApps, {
            method: 'GET',
            headers: {
                'access_token': session.access_token,
                'user': session.user.email
            },
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // process json object and place into widgets array
            const widgetComponents = data.map((app, index) => {  
                return <Widget key={index} id={app.AppName} description={app.AppDescription} />;
            });
            setWidgets(widgetComponents);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }, [getAllApps, session]);


    return (
        <section className='flex flex-col items-center gap-1.0 w-full h-full overflow-hidden xs:grow md:grow sm:grow shadow-inner lg:w-80'>
                <div className='flex justify-between w-full p-3 shadow-sm'>
                    <h2>My Widgets</h2>
                </div>
                <div className='flex flex-col gap-2 p-2 overflow-y-scroll overflow-x-hidden w-full h-full box-border bg-gray-50'>
                {widgets.length === 0 && Array.from({ length: 3 }, (_, index) => (
                    <div key={index} className='w-300 h-20 bg-slate-100 rounded-md'></div>
                ))}
                    {widgets}
                </div>
        </section>
    );
}   