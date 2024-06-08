'use client';
import ProtectedWidget from "@/app/widgets/protectedWidget";
import CleaningWidget from "./cleaningWidget";
export default function Page()
{
    return (
        <ProtectedWidget Widget={CleaningWidget} id="Cleaning" />        
    );
}