import { useEffect, useState } from 'react';    
import styles from './checkIn.module.css';
import { useSession } from "next-auth/react";

export default function CheckIn({gateway}) {
    const { data: session, status } = useSession();
    const [checkIn, setCheckIn] = useState([]);

    useEffect(() => {   
        if (session) {
            let checkapi = gateway + '/GetCheckIn';

            fetch(checkapi, {
                method: 'GET',
                headers: {
                    'access_token': session.access_token,
                    'user': session.user.email,
                },
            })
            .then(response => response.json())
            .then(data => {
                setCheckIn(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }
    }, [session, gateway]);

    if (status === 'loading') {
        return <p>Loading...</p>;
    }

    if (!session) {
        return <p>Access denied</p>;
    }

    return (
        <div className={styles.moduleView}>
            <h2 className={styles.header}>Check-in</h2>
            <p className={styles.count}>{checkIn.Count}</p>
            <p className={styles.footer}>{checkIn.Footer}</p>
            <p className={styles.refresh}>{checkIn.RandomTime}</p>
        </div>
    )
}
