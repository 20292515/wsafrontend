'use client';
import UnprotectedWidget from "../../unprotectedWidget";
import Security from "./security";

export default function Page() 
{
    return (
        <UnprotectedWidget Widget={Security} id="Security" />
    );
}