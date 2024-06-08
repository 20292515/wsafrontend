import styles from './widgetBox.module.css';
import WidgetToolBar from '../widgetToolBar/widgetToolBar';
import SettingsBox from '../settingsBox/settingsBox';
import { useState } from 'react';

export default function WidgetBox({ id, index, state, widget: InitialWidget, routableName, gateway, accessToken, userSession}) {
    const [widgetIsVisible, setWidgetIsVisible] = useState(true);
    const [settingsIsVisible, setSettingsIsVisible] = useState(false);
    const [currentWidget, setCurrentWidget] = useState(() => InitialWidget);
    const [currentRoutbaleName, setCurrentRoutableName] = useState(() => routableName);

    const toggleSettings = () => {
        setWidgetIsVisible(!widgetIsVisible);
        setSettingsIsVisible(!settingsIsVisible);
    };

    return (
        <div className={styles.widgetView}>
            <WidgetToolBar id={id} index={index} state={state} routableName={currentRoutbaleName} toggle={toggleSettings} />
            <div className={styles.display}>
                {widgetIsVisible && currentWidget}
                {settingsIsVisible && <SettingsBox 
                                        id={id} 
                                        select={setCurrentWidget} 
                                        toggle={toggleSettings} 
                                        reroute={setCurrentRoutableName}
                                        gateway={gateway}
                                        accessToken={accessToken}
                                        userSession={userSession}/>}
            </div>
        </div>
    );
}
