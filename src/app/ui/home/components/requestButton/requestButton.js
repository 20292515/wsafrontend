'use client';
import styles from '@/app/ui/home/components/requestButton/requestButton.module.css';
import { useSession } from "next-auth/react";
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export default function RequestButton({app, gateway, subbed}) {
    const { data: session } = useSession();
    const [sub, setSub] = useState(subbed);
    const endPoint = '/PutSubscriberApps';
    const putSubscriberApp = gateway + endPoint;

    useEffect(() => {
        setSub(subbed);
    }, [subbed]);

    const body = {
        AppName: [app],
        UserEmail: session.user.email,
    }

    const subscribe = () => {
        fetch(putSubscriberApp, {
            method: 'POST',
            headers: {
                'access_token': session.access_token,
                'user': session.user.email,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            setSub(true);
            return response.json();
        })
        .then(data => console.log(data))
        .catch((error) => {
            console.error('Error:', error);
        });
    }
    
    if (sub) {
        return (
            <button className='border-2 border-solid border-green-400 p-2 rounded-md min-w-12'><FontAwesomeIcon className='text-green-400 text-md' icon={faCheck} /></button>
        );
    }

    return (
        <button onClick={subscribe} className='border-2 border-solid border-blue-400 p-2 rounded-md min-w-12'><FontAwesomeIcon className='text-blue-400 text-md' icon={faPlus} /></button>
    );
}