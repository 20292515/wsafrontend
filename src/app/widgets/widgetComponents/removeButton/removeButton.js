'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';


export default function RemoveButton({id, index, state}) 
{
    
    
    const removeWidget = () => {
        const widgets = JSON.parse(localStorage.getItem('board'));
        const updatedWidgets = widgets.filter(widget => widget !== id);
        state(updatedWidgets);
    }

    return (
        <div onClick={removeWidget}>
            <FontAwesomeIcon icon={faXmark} size="lg" />
        </div>
    );
}