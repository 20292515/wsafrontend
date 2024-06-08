'use client';
import CctvPassengerFlow from "./cctvPassengerFlow";
import ProtectedWidget from "@/app/widgets/protectedWidget";

export default function Page() 
{
    return (
        <ProtectedWidget Widget={CctvPassengerFlow} id="CCTV Camera Analytics" />
    );
}