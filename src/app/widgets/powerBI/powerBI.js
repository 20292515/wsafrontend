'use client';
import {useEffect, useState} from 'react';
import {useSession} from 'next-auth/react';
import styles from './powerBI.module.css';

export default function PowerBI({id, gateway})
{
    const { data: session } = useSession();
    const [powerBI, setPowerBI] = useState([]);

    useEffect(() => {
        const endPoint = '/PowerBI';
        const secapi = gateway + endPoint;

        fetch(secapi, {
            method: 'GET',
            headers: {
                'access_token': session.access_token,
                'user': session.user.email
            },
            })
            .then(response => response.json())
            .then(data => {
                setPowerBI(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [session, gateway]);

    if (!session) {
        return <p key={id} >Access denied</p>;
    }

    return (
        <div key={id} className={styles.iframeContainer}>
            <iframe src="https://nextjs.org/"
                width={800}
                height={800}
                allowFullScreen="true">
            </iframe>
        </div>
    );
}