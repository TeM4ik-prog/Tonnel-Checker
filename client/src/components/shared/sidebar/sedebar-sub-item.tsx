import { DotIcon, RowsIcon, TagIcon } from "lucide-react";
import { NavLink } from "react-router-dom"

interface Props {
    icon?: JSX.Element;
    text: string;
    href: string;
}

export const SidebarSubItem = ({ icon, text, href }: Props) => {

    return (
        <NavLink to={href} className="flex flex-row p-2 hover:bg-gray-700 rounded">
            <DotIcon />
            {text}
        </NavLink>
    )
}