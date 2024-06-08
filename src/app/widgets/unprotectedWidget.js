'use client';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from "next/navigation";
import Link from 'next/link';
import styles from './protectedWidget.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function UnprotectedWidget({Widget, id}) {
    const { data: session } = useSession();
    const gateway = process.env.NEXT_PUBLIC_GATEWAY || process.env.NEXT_PUBLIC_GATEWAY_DEV;
    // check if user logged in
    if (!session) {
        return redirect('/api/auth/signin');
    }

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
    // render widget page if allowed access
    return  page;
}