'use client';
import {useSession} from "next-auth/react";
import { redirect } from "next/navigation";
import NavBar from "@/app/ui/home/navbar/navbar";
import styles from '@/app/admin/page.module.css';
import requestList from '@/app/admin/requestList.js';
import RedirectButton from "./components/redirectButton";
import { importAllImages } from '@/app/ui/home/navicon.js';
import Image from 'next/image'

export default function Page() {
    const { data: session } = useSession();

    if (!session) {
        redirect('/api/auth/signin');
        return null;
    }

    if (session.user.name != "cstewart@wsaco.com.au") {
        return (
            <div>
                <h1>Unauthorized Access Is Prohibited</h1>
            </div>
        );
    }

    const getRowStyle = (type) => {
        switch (type) {
            case "Security":
                return styles.security;
            case "User Update":
                return styles.update;
            case "User Management":
                return styles.management;
            case "Security Alert":
                return styles.alert;
            default:
                return "";
        }
    };

    const requests = requestList.map((req, index) => {
        const rowStyle = getRowStyle(req.type);
        const combinedClass = `${styles.requests} ${rowStyle} ${styles.rowWrapper}`;
        return (

            <tr key={index} className={combinedClass}>
                <td style={{ width: '10%' }}>{req.id}</td>
                <td style={{ width: '30%' }}>{req.type}</td>
                <td style={{ width: '40%' }}>{req.userID}</td>
                <td style={{ width: '20%' }}>{req.timestamp}</td>
             </tr>

        );
    });

    return (
        <main className={styles.main}>
            <div className={styles.topbar}>
                <div className={styles.navContainer}>
                    <Image src="/wsilogo.svg" alt="WSI Logo" width={100} height={100} />
                    <div className={styles.navContent}>
                        <h2> Administration Panel</h2>
                        <h3> {session.user.name} </h3>
                    </div>
                </div>
                <div className={styles.close}>
                    <RedirectButton url='/' index={7} />
                </div>
            </div>
            <section className={styles.tableContent}>
                <h1> My Action Items</h1>
                <table className={styles.requests}>
                    <thead>
                        <tr>
                            <th>Request ID</th>
                            <th>Request Type</th>
                            <th>User ID</th>
                            <th>Timestamp</th>
                        </tr>
                    </thead>
                    <tbody>   
                        {requests}                       
                    </tbody>
                </table>
            </section>
        </main>
    );
}
