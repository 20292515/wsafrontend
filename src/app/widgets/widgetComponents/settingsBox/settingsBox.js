'use client';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import styles from './settingsBox.module.css';
import { WidgetRegister } from '../../widgetRegister';

export default function SettingsBox({ id, select, toggle, reroute, gateway}) {
    const { data: session } = useSession();
    const [functions, setFunctions] = useState([]);

    useEffect(() => {
        if (session) {
            console.log('Fetching app functions...');
            fetch(`${gateway}/GetAllAppFunctions?UserEmail=${session.user.email}&AppName=${id}`, {
                method: 'GET',
                headers: {
                    'access_token': session.access_token,
                    'user': session.user.email,
                },
            })
                .then(response => {
                    console.log('Received response:', response);
                    return response.text().then(text => {
                        console.log('Response text:', text);
                        return text ? JSON.parse(text) : {};
                    });
                })
                .then(data => {
                    console.log('Response JSON:', data);
                    const funcs = data[0].Functions.map((item) => item.AppFunctionName);
                    setFunctions(funcs);
                    console.log('App functions set:', funcs);
                })
                .catch(error => {
                    console.error('Error fetching app functions:', error);
                });
        }
    }, [session, session.access_token, session.user.email, id, gateway]);
    
    

    const selectFunction = (item) => {
        console.log(item)
        const registerListing = WidgetRegister(item.trim());
        const Widget = registerListing.widget;
        const route = registerListing.routableName;
        select(() => <Widget gateway={gateway} />);
        reroute(route);
        toggle();
    };

    const funcs = functions.map((item) => (
        <div onClick={() => selectFunction(item)} className={styles.func} key={item}>
            {item}
        </div>
    ));

    if (functions.length === 0) {
        return <div className={styles.funcBox}>No available functions for {id}</div>;
    }

    return <div className={styles.funcBox}>{funcs}</div>;
}
