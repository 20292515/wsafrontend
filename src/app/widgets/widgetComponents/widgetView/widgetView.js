import styles from './widgetView.module.css';

// displays the widget that has been dragged and dropped intot he widget container
// its purpose is to display the widget in a different way than the widget in the sidenav
export default function WidgetView({id}) {
    return (
        <div className={styles.widgetView}>
            <h1 className={styles.title}>{id} Unavailable</h1>
        </div>
    );
}