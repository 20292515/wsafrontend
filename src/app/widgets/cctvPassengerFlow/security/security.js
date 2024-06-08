import { useEffect, useState } from 'react';
import styles from './security.module.css';
import { useSession } from "next-auth/react";

export default function Security({gateway}) {
    const { data: session } = useSession();
    const [security, setSecurity] = useState([]);

    useEffect(() => {
        const apiGateway = gateway;
        const endPoint = '/GetSecurity';
        const secapi = apiGateway + endPoint;

        fetch(secapi, {
            method: 'GET',
            headers: {
                'access_token': session.access_token,
                'user': session.user.email
            },
            })
            .then(response => response.json())
            .then(data => {
                setSecurity(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [session, gateway]);

    if (!session) {
        return <p>Access denied</p>;
    }

    return (
        <div className={styles.moduleView}>
            <h2 className={styles.header}>Security</h2>
            <p className={styles.count}>{security.Count}</p>
            <p className={styles.footer}>{security.Footer}</p>
            <p className={styles.refresh}>{security.RandomTime}</p>
        </div>
    );
}
