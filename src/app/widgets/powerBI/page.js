import ProtectedWidget from "../protectedWidget";
import PowerBI from "./powerBI";
export default function Page() {
    return (
        <ProtectedWidget Widget={PowerBI} id="Microsoft Power BI" />
    );
}