import { ItemTypes } from '@/app/ui/home/constants';
import { useDrag } from 'react-dnd';
import styles from '@/app/ui/home/navbar/myLayouts/userLayout.module.css';

export default function UserLayout({id, widgets}) {
    
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.USERLAYOUT,
        item: {id: id, widgets: widgets},
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));
    
    return (
        <div
            ref={drag}
            style={{
                opacity: isDragging ? 0.5 : 1,
            }}
            className='flex flex-col w-full'
        >
            <article className='flex justify-between items-center p-6 rounded-md bg-white shadow-lg cursor-pointer w-full hover:scale-105 transition ease-in-out'>
                <p className='text-sm font-medium text-black'>{id}</p>
            </article>
            
        </div>
    );
}