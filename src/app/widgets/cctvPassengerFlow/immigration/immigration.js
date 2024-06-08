import { useState, useEffect } from 'react';
import styles from './immigration.module.css';
import { useSession } from "next-auth/react";

export default function Immigration({gateway}) {
    const { data: session} = useSession();
    const [immigration, setImmigration] = useState([]);

    useEffect(() => {
        if (session) {
            const endPoint = '/GetImmigration';
            const immiapi = gateway + endPoint;

            fetch(immiapi, {
                method: 'GET',
                headers: {
                    'access_token': session.access_token,
                    'user': session.user.email
                },
            })
            .then(response => response.json())
            .then(data => {
                setImmigration(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }
    }, [session, gateway]);

    if (!session) {
        return <p>Access denied</p>;
    }

    return (
        <div className={styles.moduleView}>
            <h2 className={styles.header}>Immigration</h2>
            <p className={styles.count}>{immigration.Count}</p>
            <p className={styles.footer}>{immigration.Footer}</p>
            <p className={styles.refresh}>{immigration.RandomTime}</p>
        </div>
    );
}
