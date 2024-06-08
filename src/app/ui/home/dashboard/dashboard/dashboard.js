'use client';
import { useEffect, useState } from 'react'; // Import useEffect
import NavBar from "@/app/ui/home/navbar/navbar";
import WidgetContainer from '../widgetContainer/widgetcontainer';
import styles from '@/app/ui/home/dashboard/dashboard/dashboard.module.css';
import { useSession } from "next-auth/react"; // Import useSession

export default function Dashboard() {
    const gateway = process.env.NEXT_PUBLIC_GATEWAY || process.env.NEXT_PUBLIC_GATEWAY_DEV;
    
    // Return main content if session is loaded
    return (
        <main className={styles.dashboard}>
            <NavBar gateway={gateway} />
            <WidgetContainer gateway={gateway} />
        </main>
    );
}
