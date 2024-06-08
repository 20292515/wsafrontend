import { useEffect, useState } from "react";
import styles from "./recentNotifications.module.css";
import { useSession } from "next-auth/react";
import { v4 as uuidv4 } from 'uuid';

export default function RecentNotifications({gateway}) {
    const { data: session} = useSession();
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        if (session) {
            const endPoint = '/GetRecentNotifications';
            const receapi = gateway + endPoint;

            fetch(receapi, {
                method: 'GET',
                headers: {
                    'access_token': session.access_token,
                    'user': session.user.email
                },
            })
            .then(response => response.json())
            .then(data => {
                const notificationData = data.map((notification) => {
                    return (
                        <div key={uuidv4()} className={styles.notification}>
                            <p>{notification.RandomQueueMessage}</p>
                            <p>{notification.RandomTime}</p>
                        </div>
                    );
                });
                setNotifications(notificationData);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }
    }, [session, session.access_token, session.user.email, gateway]);


    if (!session) {
        return <p>Access denied</p>;
    }

    return (
        <div className={styles.notificationsContainer}>
            <h1>Recent Notifications</h1>
            {notifications}
        </div>
    );
}
