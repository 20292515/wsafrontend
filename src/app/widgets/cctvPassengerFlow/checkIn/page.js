'use client';
import CheckIn from "./checkIn";
import UnprotectedWidget from "../../unprotectedWidget";
export default function Page() 
{
    return (
        <UnprotectedWidget Widget={CheckIn} id="Check-in" />
    );
}