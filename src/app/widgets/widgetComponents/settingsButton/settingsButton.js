'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';


export default function SettingsButton({toggle}) {

    return (
        <div onClick={toggle}>
            <FontAwesomeIcon icon={faGear} size="sm"/>
        </div>
    );
}