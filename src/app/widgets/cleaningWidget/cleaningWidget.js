import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import styles from './cleaningWidget.module.css';
import {v4 as uuidv4} from 'uuid';

export default function CleaningWidget({id, gateway}) {

    const { data: session, status } = useSession();
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
    const [result, setResult] = useState([]);

    const logCleaning = (e) => {
        e.preventDefault();
        fetch(`${gateway}/LogACleaningJob`, {
            method: 'POST',
            headers: {
                'access_token': session.access_token,
                'user': session.user.email,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'UserEmail': session.user.email,
                'Datetime': date,
                'Location': location
            })
        })
        .then(response => {
            return response.text().then(text => {
                try {
                    return JSON.parse(text);
                } catch (error) {
                    console.error('Error parsing JSON:', text);
                    throw error;
                }
            });
        })
        .then(data => {
            const results = data.map((result) => {  
                return (
                    <div key={uuidv4()} className={styles.result}>
                        <p>{result.SummaryJson}</p>
                    </div>
                );
            });
            setResult(results);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
    
    if(!session) {
        return (
            <div key={uuidv4()}>Unauthorized</div>
        );
    }

    if (result.length > 0) {
        return (
            <div key={uuidv4()}>
                <div className={styles.btnContainer}>
                    <div onClick={() => setResult([])} className={styles.backButton}>
                        Log Another Job
                    </div>
                </div>
                
                <div className={styles.resultContainer}>
                    {result}
                </div>
            </div>
            
        );
    }

    return (
        <div key={uuidv4()} className={styles.widgetView}>
            <form className={styles.cleaningform} onSubmit={logCleaning}>
            <h2>Log a cleaning job</h2>
                <label>
                    <input onChange={(e) => {
                        const dateTime = e.target.value.split('T');
                        const date = dateTime[0];
                        let splitDate = date.split('-');
                        let newDateFormat = splitDate[2] + '/' + splitDate[1] + '/' + splitDate[0];
                        setDate(newDateFormat + ' ' + dateTime[1]);
                        }} 
                        type="datetime-local"/>
                </label>
                <label>
                    <input onChange={(e) => setLocation(e.target.value)} type="text" placeholder="Location of clean" />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}