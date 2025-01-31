import { DotIcon, RowsIcon, TagIcon } from "lucide-react";
import { NavLink } from "react-router-dom"

interface Props {
    icon?: JSX.Element;
    text: string;
    href: string;
    closeSidebar: () => void;
}

export const SidebarSubItem = ({ icon, text, href, closeSidebar }: Props) => {

    return (
        <NavLink to={href} className="flex flex-row p-2 hover:bg-gray-700 rounded" onClick={closeSidebar}>
            <DotIcon />
            {text}
        </NavLink>
    )
}