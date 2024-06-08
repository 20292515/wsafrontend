// Import all widgets you would like to register here
import WidgetView from '@/app/widgets/widgetComponents/widgetView/widgetView';
import CleaningWidget from '@/app/widgets/cleaningWidget/cleaningWidget';
import CctvPassengerFlow from '@/app/widgets/cctvPassengerFlow/cctvPassengerFlow';
import Security from './cctvPassengerFlow/security/security';
import Immigration from './cctvPassengerFlow/immigration/immigration';
import CheckIn from './cctvPassengerFlow/checkIn/checkIn';
import PowerBI from './powerBI/powerBI';


// register a widget to be available within the application
// by registering its app name as the key and mapping it to 
// its corresponding component
// key -> AppName returned from backend api call
// value -> name of Component to map to (imported above)
const widgets = { // all widget registries to be added here
    'Cleaning': {
        'widget': CleaningWidget, 
        'routableName': 'cleaningWidget'
    },
    'Log a cleaning job': {
        'widget': CleaningWidget, 
        'routableName': 'cleaningWidget'
    },
    'CCTV Camera Analytics': {
        'widget': CctvPassengerFlow, 
        'routableName': 'cctvPassengerFlow'
    },
    'Security': {
        'widget': Security, 
        'routableName': 'cctvPassengerFlow/security'
    },
    'Immigration': {
        'widget': Immigration, 
        'routableName': 'cctvPassengerFlow/immigration',
    },
    'Check-in': {
        'widget': CheckIn, 
        'routableName': 'cctvPassengerFlow/checkIn'
    },
    'SSO to CCTV Camera Analytics': {
        'widget': CctvPassengerFlow, 
        'routableName': 'cctvPassengerFlow'
    },
    'Microsoft Power BI': {
        'widget': PowerBI, 
        'routableName': 'powerBI'
    },
    'WSI Power BI Data Analytics': {
        'widget': PowerBI, 
        'routableName': 'powerBI'
    },

}

const defaultWidget = {
    'widget': WidgetView, 
    'routableName': 'default'
}


// helper function to retrieve widget component
export const WidgetRegister = (id) => {
    // return widget to be rendered if found or return default widget
    return widgets[id] || defaultWidget;
}