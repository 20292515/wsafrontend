'use client';
import RequestButton from "@/app/ui/home/components/requestButton/requestButton";
import styles from '@/app/ui/home/navbar/appStore/availableWidget.module.css';
export default function AvailableWidget({app, gateway, subbed}) {
    return (
        <div className="flex justify-between items-center gap-1 p-4 rounded-md bg-white shadow-lg w-full">
            <p className='text-sm font-medium text-black'>{app}</p>
            <RequestButton app={app} gateway={gateway} subbed={subbed}/>
        </div>
    );
}