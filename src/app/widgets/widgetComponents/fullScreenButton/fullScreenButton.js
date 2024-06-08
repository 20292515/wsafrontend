import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpRightAndDownLeftFromCenter } from "@fortawesome/free-solid-svg-icons";
export default function FullScreenButton({routableName})
{
    return (
        <Link href={'/widgets/' + routableName}>
            <FontAwesomeIcon icon={faUpRightAndDownLeftFromCenter} size="sm"/>
        </Link>
    );
}