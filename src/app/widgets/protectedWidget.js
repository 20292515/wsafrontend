'use client';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from "next/navigation";
import Link from 'next/link';
import styles from './protectedWidget.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function ProtectedWidget({Widget, id}) {
    const { data: session } = useSession();
    const [allowed, setAllowed] = useState(false); 
    const gateway = process.env.NEXT_PUBLIC_GATEWAY || process.env.NEXT_PUBLIC_GATEWAY_DEV;

    // check if user has access to the widget
    const apiGateway = gateway;
    const endPoint = '/GetSubscriberApps';
    const getAllUserApps = apiGateway + endPoint + '/'+ session.user.email;

    useEffect(() => {
        fetch(getAllUserApps, {
            method: 'GET',
            headers: {
                'access_token': session.access_token,
                'user': session.user.email
            },
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            data.forEach((widget) => {
                if (widget['AppName'] === id) {
                    return setAllowed(true);
                }
            });
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }, [session, session.access_token, session.user.email, allowed, id, Widget, getAllUserApps]);

    const page = (
    <div className={styles.page}>
        <div className={styles.fullscreenNav}>
            <Link href="/"><FontAwesomeIcon icon={faArrowLeft} size='lg'/></Link>
        </div>
        <div className={styles.fullscreenBody}> 
            <Widget gateway={gateway}/>
        </div>
        
    </div>
    );

    // check if user logged in
    if (!session) {
        return redirect('/api/auth/signin');
    }

    // render widget page if allowed access
    return allowed ? page : <div> You do not have access to this widget {id} </div>;
}