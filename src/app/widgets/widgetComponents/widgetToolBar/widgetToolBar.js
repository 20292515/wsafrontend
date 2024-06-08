import styles from "./widgetToolBar.module.css";
import RemoveButton from "../removeButton/removeButton";
import SettingsButton from "../settingsButton/settingsButton";
import FullScreenButton from "../fullScreenButton/fullScreenButton";

export default function WidgetToolBar({id, index, state, routableName, toggle})
{
    return (
        <div className={styles.bar}>
            <FullScreenButton routableName={routableName}/>
            <SettingsButton toggle={toggle} />
            <RemoveButton id={id} index={index} state={state}/>
        </div>
    );
}