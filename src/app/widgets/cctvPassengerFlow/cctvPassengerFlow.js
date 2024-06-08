'use client';
import styles from './cctvPassengerFlow.module.css';

// components that make up the passengerFlow
import Security from './security/security';
import Immigration from './immigration/immigration';
import CheckIn from './checkIn/checkIn';
import RecentNotifications from './recentNotifications/recentNotifications';

export default function CctvPassengerFlow({id, gateway}) {
    return (
        <div className={styles.widgetView}>
            <div className={styles.contentContainer}>
                <div className={styles.statistics}>
                    <Security gateway={gateway} />
                    <Immigration gateway={gateway}/>
                    <CheckIn gateway={gateway}/>
                </div>
                <RecentNotifications gateway={gateway} />
            </div>
            
        </div>
    );
}