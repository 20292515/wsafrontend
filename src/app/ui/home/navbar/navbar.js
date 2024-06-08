'use client';
import { useState } from 'react';
import { useSession } from "next-auth/react";
import styles from '@/app/ui/home/navbar/navbar.module.css';
import SubscribedWidgets from '@/app/ui/home/navbar/myWidgets/subscribedWidgets';
import AvailableWidgets from '@/app/ui/home/navbar/appStore/availableWidgets';
import UserLayouts from '@/app/ui/home/navbar/myLayouts/userLayouts';
import UserPage from '@/app/ui/home/navbar/user/user.js'
import { importAllImages } from '../navicon';
import Image from 'next/image'
import notificationList from '../notificationList';


//const imagePaths = Array.from({ length: 9 }, (_, i) => `/public/Notifications/N0${i}.png`);
export default function NavBar({gateway}) {

    const isMobile = () => window.innerWidth <= 1024;

    const [subscribedVisible, setSubscribedVisible] = useState(isMobile() ? true : false);
    const [availableVisible, setAvailableVisible] = useState(false);
    const [layoutsVisible, setLayoutsVisible] = useState(false);
    const [userVisible, setUserVisible] = useState(false);
    const images = importAllImages();

    const notifLength = notificationList.length;
    const imagePath = `/Notifications/N0${Math.min(notifLength, 10)}.png`;


    const toggleSubscribedVisibility = () => {
        if (subscribedVisible && !isMobile()) {
            setSubscribedVisible(false);
        } else {
            setSubscribedVisible(true);
            setAvailableVisible(false);
            setLayoutsVisible(false);
            setUserVisible(false);
        }
    };

    const toggleAvailableVisibility = () => {
        if (availableVisible && !isMobile()) {
            setAvailableVisible(false);
        } else {
            setSubscribedVisible(false);
            setLayoutsVisible(false);
            setAvailableVisible(true);
            setUserVisible(false);
        }
    };

    const toggleLayoutsVisibility = () => {
        if (layoutsVisible && !isMobile()) {
            setLayoutsVisible(false);
        } else {
            setLayoutsVisible(true);
            setAvailableVisible(false);
            setSubscribedVisible(false);
            setUserVisible(false);
        }
    }

    const toggleUserVisibility = () => {
        if (userVisible && !isMobile()) {
            setUserVisible(false);
        } else {
            setLayoutsVisible(false);
            setAvailableVisible(false);
            setSubscribedVisible(false);
            setUserVisible(true);
        }
    }

   // const notifLength = notificationList.length;
   // const imagePath = notifLength < imagePaths.length ? imagePaths[notifLength] : imagePaths[imagePaths.length - 1];

    return (
        <div className='flex p-4 gap-1.0 shadow-xl flex-col-reverse h-full lg:flex-row lg:flex-nowrap lg:h-auto'>
            <nav className='flex flex-row justify-center w-full lg:flex-col lg:justify-between lg:w-16'>
                <section className='flex grow justify-around lg:flex-col lg:grow-0 lg:justify-start'>
                    <div className='flex justify-center items-center cursor-pointer m-2 mr-3 w-12 h-12 rounded-sm' onClick={toggleSubscribedVisibility}> <Image src={images[0]['default'].src} width={500} height={500} alt="My Apps" /> </div> 
                    <div className='flex justify-center items-center cursor-pointer m-2 mr-3 w-12 h-12 rounded-sm' onClick={toggleAvailableVisibility}> <Image src={images[3]['default'].src} width={500} height={500} alt="Store" /> </div>
                    <div className='flex justify-center items-center cursor-pointer m-2 mr-3 w-12 h-12 rounded-sm hidden lg:block' onClick={toggleLayoutsVisibility}> <Image src={images[1]['default'].src} width={500} height={500} alt="Layout" /> </div>
                </section>
                <section className='flex grow justify-around lg:flex-col lg:grow-0 lg:justify-start'>
                    <div className='flex justify-center items-center cursor-pointer m-2 mr-3 w-12 h-12 rounded-sm' onClick={toggleUserVisibility} style={{ position: 'relative' }} > 
                        <Image src={images[5]['default'].src} width={500} height={500} alt="User" />
                        <Image src={imagePath} width={20} height={20} alt="Notification Number" style={{ position: 'absolute', top: 0, right: 0 }} /></div>
                    <div className='flex justify-center items-center cursor-pointer m-2 mr-3 w-12 h-12 rounded-sm'> <Image src={images[2]['default'].src} width={500} height={500} alt="Settings" /> </div>
                </section>
            </nav>
            {subscribedVisible && <SubscribedWidgets gateway={gateway}/>}
            {availableVisible && <AvailableWidgets gateway={gateway}/>}
            {layoutsVisible && <UserLayouts gateway={gateway}/>}
            {userVisible && <UserPage gateway={gateway}/>}
        </div>
    );
}
