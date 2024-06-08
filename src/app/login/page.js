import Login from "@/app/ui/login/login";
import globalstyles from '@/app/globals.css';
import styles from "@/app/login/page.module.css";

// login page accessed at /login
export default function Page() {
    return (
        <main className={[globalstyles.normalLogin, styles.layout]}>
            <Login />
        </main>
    );    
}