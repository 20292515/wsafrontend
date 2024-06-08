'use client';
import { useEffect, useState } from 'react';
import { SessionProvider } from 'next-auth/react';

export default function ProviderWrapper({ children, session }) {
    // Use state to store the session
    const [currentSession, setCurrentSession] = useState(session);

    // Subscribe to changes in the session prop
    useEffect(() => {
        setCurrentSession(session);
    }, [session]); // Re-run this effect when session prop changes

    return (
        <SessionProvider session={currentSession}>
            {children}
        </SessionProvider>
    );
}
