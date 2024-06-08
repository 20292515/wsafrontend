import styles from '@/app/ui/home/navbar/myLayouts/userLayouts.module.css';
import LayoutList from '../../layoutList';
import UserLayout from './userLayout';

export default function UserLayouts({gateway}) {

    const layouts = LayoutList.map((layout, index) => {
        return <UserLayout id={layout.layoutName} key={layout.layoutName} widgets={layout.widgets}/>;   
    });

    return (
        <div className='flex flex-col items-center gap-1.0 w-full h-full overflow-hidden xs:grow md:grow sm:grow shadow-inner lg:w-80'>
            <div className='flex justify-between w-full p-3 shadow-sm'>
                    <h2>My Layouts</h2>
            </div>
            <div className='flex flex-col gap-2 p-2 overflow-y-scroll overflow-x-hidden w-full h-full box-border bg-gray-50'>
                <div className='flex justify-center bg-white cursor-pointer border-2 border-solid rounded-lg border-blue-400 p-6 w-full'>
                    <p className='text-blue-500'>Create New Layout</p>
                </div>
                {layouts}
            </div>
        </div>
    );
}