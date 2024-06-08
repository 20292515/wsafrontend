'use client';
import React, { useEffect, useState } from 'react';
import styles from '@/app/ui/home/dashboard/widgetContainer/widgetcontainer.module.css';
import { ItemTypes } from '@/app/ui/home/constants';
import { useDrop } from 'react-dnd';
import { WidgetRegister } from '@/app/widgets/widgetRegister';
import WidgetBox from '@/app/widgets/widgetComponents/widgetBox/widgetBox';
import {v4 as uuidv4} from 'uuid';
import Loading from '../../components/loading/loading';


export default function WidgetContainer({gateway, userSession, accessToken}) {
    
    // this provides the drop functionality for the widget container
    // the widget container is the main content area where widgets can be dropped
    // the functionality is provided by the react-dnd library
    const storageBoard = localStorage.getItem('board');
    const [board, setBoard] = useState(storageBoard ? JSON.parse(storageBoard) : [])

    useEffect(() => {
        localStorage.setItem('board', JSON.stringify(board));
    }, [board]);

    const [{isOver}, drop] = useDrop(() => ({
        accept: [ItemTypes.WIDGET, ItemTypes.USERLAYOUT],
        drop: (item, monitor) => {
            const type = monitor.getItemType();
            switch(type) {
                case ItemTypes.WIDGET:
                    addWidget(item.id);
                    break;
                case ItemTypes.USERLAYOUT:
                    item.widgets.map(widget => addWidget(widget));
                    break;
            }
        }, // addWidget is a function that adds the widget to the board defined below
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }))

    // this is responsible for building the list of widgets on the board that have been dropped and will be rendered
    const addWidget = (id) => {
        const droppedWidget = id; // widget information that was dropped into the board - only id for now
        setBoard(board => [droppedWidget, ...board])
    }

    // widgets turn into a widget view components to allow ease in displaying the widgets differently
    const boardWidgets = board.map((widget,index) => {
        const registerListing = WidgetRegister(widget);
        const WidgetComponent = registerListing.widget;

        return <WidgetBox 
        key={uuidv4()} 
        id={widget} 
        index={index} 
        state={setBoard} 
        routableName={registerListing.routableName} 
        gateway={gateway} 
        userSession={userSession}
        accessToken={accessToken} 
        widget={<WidgetComponent 
                        id={widget} 
                        gateway={gateway} 
                        userSession={userSession}
                        accessToken={accessToken}
                        key={uuidv4()}
                        />}
        />; // key needs to be set to something more unique
    });

    return (
        <div 
            className='p-6 hidden lg:flex flex-wrap justify-start gap-4 grow overflow-y-scroll overflow-x-hidden'
            ref={drop}
        >
        {/* shows shadow box on hover when draggin widget */}
        {isOver && (
            <div className='w-80 h-full bg-slate-200 rounded-lg shadow-inner'/>
        )}
            {boardWidgets.length != 0 ? boardWidgets : <div className='flex justify-center items-center h-full w-full text-2xl text-gray-300'>Drop your widgets or layouts here from My Widgets.<Loading/></div>}
        
        </div>
    );
}
