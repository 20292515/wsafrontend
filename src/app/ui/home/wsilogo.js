import Image from "next/image";

// WSI Logo component provded by wsi
export default function WsiLogo() {
    return (
        <Image
            src="/wsilogo.svg"
            alt="WSI Logo"
            width={320}
            height={200}
        />
    );
}