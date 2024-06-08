import { useRouter } from "next/router";
import Link from "next/link";
import styles from '@/app/admin/components/redirect.module.css';
import { importAllImages } from '@/app/ui/home/navicon.js';
import Image from 'next/image'


export default function RedirectButton({ url, index }) {

    const images = importAllImages();

    return (
        <div>
            
            <Link href={url}>
                <Image className={styles.navicon} src={images[index]['default'].src} width={60} height={60} alt="Home" />
            </Link> 
       </div>
    );

}