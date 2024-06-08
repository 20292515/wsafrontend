import styles from '@/app/ui/login/login.module.css';
import WsiLogo from '../home/wsilogo';

// Login component is the login page for the application
export default function Login() {
    return (
        <div className={styles.layout}>
            <WsiLogo/>
            <br/>
            <hr />
            <form className={styles.loginForm}  action='/' method="POST">
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" className={styles.formItem}/>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" className={styles.formItem}/>
                <button type="submit" className={styles.formItem}>Login</button >
            </form>
        </div>
    );
}