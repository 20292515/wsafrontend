'use client';
import styles from '@/app/ui/home/navbar/appStore/availableWidgets.module.css';
import { useState, useEffect } from 'react';
import AvailableWidget from './availableWidget';
import { useSession } from "next-auth/react";

export default function AvailableWidgets({gateway}) {
    const { data: session } = useSession();
    
    const endPoint = '/GetAllApps';
    const getAllApps = gateway + endPoint + '/' + session.user.email;

    // widgets
    const [widgets, setWidgets] = useState([]);
    const [subbedWidgets, setSubbedWidgets] = useState([]);
    const [unSubbedWidgets, setUnSubbedWidgets] = useState([]); // [TODO

    // fetch the list of all apps from the backend
    useEffect(() => {

        // get All already SUBSCRIBED APPS
        fetch(`${gateway}/GetSubscriberApps/${session.user.email}`, {
            method: 'GET',
            headers: {
                'access_token': session.access_token,
                'user': session.user.email
            },
        })
        .then(response => response.json())
        .then(data => {

            const subbed = data.map((app, index) => {
                return app.AppName;
            });
            setSubbedWidgets(subbed);

        })
        .catch((error) => {
            console.error('Error:', error);
        });
        
        // get All available APPS
        fetch(getAllApps, {
            method: 'GET',
            headers: {
                'access_token': session.access_token,
                'user': session.user.email,
            },
        })
        .then(response => {
            if (!response.ok) {
                console.log(response);
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {

            const unsubbed = data.map((app, index) => {
                return app.AppName;
            });
            setUnSubbedWidgets(unsubbed);
        })
        .catch((error) => {
            console.error('Error:', error);
        });

    }, [gateway, getAllApps, session, session.access_token, session.user.email]);

    useEffect(() => {
        // process json object and place into widgets array
        const widgetComponents = unSubbedWidgets.map((app, index) => {  
            let subbed = false;
            if (subbedWidgets.includes(app)) {
                subbed = true;
            }
            return <AvailableWidget key={index} app={app} gateway={gateway} subbed={subbed}/>;
        });
        
        setWidgets(widgetComponents);
    }
    , [subbedWidgets, unSubbedWidgets, gateway]);

    const search = (e) => {
        const search = e.target.value;
        const filteredWidgets = unSubbedWidgets.filter((app) => {
            return app.toLowerCase().includes(search.toLowerCase());
        });

        const widgetComponents = filteredWidgets.map((app, index) => {  
            let subbed = false;
            if (subbedWidgets.includes(app)) {
                subbed = true;
            }
            return <AvailableWidget key={index} app={app} gateway={gateway} subbed={subbed}/>;
        });
        setWidgets(widgetComponents);
    }
    
    if (!session) {
        return <p>access denied</p>;
    }
    
    return (
        <div className='flex flex-col items-center gap-1.0 w-full h-full overflow-hidden xs:grow md:grow sm:grow shadow-inner lg:w-80'>
            <div className='flex flex-col justify-between gap-1 w-full p-3 shadow-sm'>
                    <h2>App Store</h2>
                    <form>
                        <input onChange={search} className='w-full p-2 rounded-md border-solid border border-black' type="text" placeholder="Search..." />
                    </form>
            </div>
            <div className='flex flex-col gap-2 p-2 overflow-y-scroll overflow-x-hidden w-full h-full box-border bg-gray-50'>
                {widgets.length === 0 && Array.from({ length: 3 }, (_, index) => (
                    <div key={index} className='w-300 h-20 bg-slate-100 rounded-md'></div>
                ))}
                {widgets}
            </div>
        </div>
    );
}