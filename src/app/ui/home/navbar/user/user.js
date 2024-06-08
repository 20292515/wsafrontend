'use client';
import { useSession } from "next-auth/react";
import React, { useState, useEffect } from 'react';
import styles from '@/app/ui/home/navbar/user/user.module.css';
import notificationList from '@/app/ui/home/notificationList.js';
import SignoutButton from '@/app/ui/home/components/signoutButton/signoutButton';
import RedirectButton from "@/app/admin/components/redirectButton";



export default function UserPage() {

    const { data: session } = useSession();

    const isAdmin = session?.user?.email === 'cstewart@wsaco.com.au';

    const notifications = notificationList.map((req, index) => {

        let backgroundColorClass = '';
        if (req.urgency === 1) {
            backgroundColorClass = 'bg-green-400';
        } else if (req.urgency === 2) {
            backgroundColorClass = 'bg-orange-400';
        } else if (req.urgency === 3) {
            backgroundColorClass = 'bg-red-400';
        }

        return (
            <div key={index} className={`w-full p-6 bg-white rounded-xl shadow-lg flex items-center space-x-4 hover:scale-105 transition ease-in-out ${backgroundColorClass}`}>
                <p>{req.type}</p>
                <p>{req.timestamp}</p>
            </div>
        );
    });

    return (
        <div className='flex flex-col justify-between items-center gap-1.0 w-full h-full overflow-hidden xs:grow md:grow sm:grow shadow-inner lg:w-80'>
            <div className='flex justify-between w-full p-3 shadow-sm'>
                <div>{session.user.name}</div> 
                
                <div>
                {isAdmin && <RedirectButton url='/admin' index={7} />}               
            </div>
            </div>

            <section className="flex flex-col w-full grow p-4 overflow-y-scroll overflow-x-hidden">
                <div className='flex flex-col gap-1 p-2  h-full w-full'>
                    {notifications}
                </div>
            </section>

            <div className='flex w-full shadow-sm p-2'>
                <SignoutButton />
            </div>
        </div>
    );
}