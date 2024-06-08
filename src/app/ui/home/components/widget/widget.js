import styles from '@/app/ui/home/components/widget/widget.module.css';
import { ItemTypes } from '@/app/ui/home/constants';
import { useDrag } from 'react-dnd';
import Link from 'next/link';
import { WidgetRegister } from '@/app/widgets/widgetRegister';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlane } from '@fortawesome/free-solid-svg-icons';

export default function Widget({id}) {
    
    const widgetLising = WidgetRegister(id);
    // provides the drag and drop information for the widget
    // the widget is draggable and the item type is WIDGET
    // the functionality is provided by the react-dnd library
    // and applied to the widget component returned below
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.WIDGET,
        item: {id: id},
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
            className={styles.box}
        >
            {/* <article className={styles.widget}>
                <FontAwesomeIcon icon={faPlane} />
                <p>{id}</p>
            </article> */}

            <article className='p-6 bg-white rounded-xl shadow-lg flex items-center space-x-4 hover:scale-105 transition ease-in-out hidden lg:flex'>
                <FontAwesomeIcon className='h-8 w-8 text-blue' icon={faPlane} />
                <p className='text-sm font-medium text-black'>{id}</p>
            </article>

            <Link className='p-6 bg-white rounded-xl shadow-lg flex items-center space-x-4 hover:bg-sky-400 lg:hidden md:flex sm:flex xs:flex' href={`/widgets/${widgetLising.routableName}`}>
            <FontAwesomeIcon className='h-8 w-8 text-blue' icon={faPlane} />
            <p className='text-sm font-medium text-black'>{id}</p>
            </Link>
        </div>
    );
}