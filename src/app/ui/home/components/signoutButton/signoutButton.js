import { signOut } from "next-auth/react";

export default function SignoutButton() {
    function nullSession() {
        localStorage.removeItem('board');
        signOut();
    }
    return (
        <button className="w-full bg-red-600 rounded-md p-4" onClick={() => nullSession()}>Sign Out</button>
    );
}