import { NavLink } from "react-router-dom";

interface Props {
    text: string;
    href: string;
    closeSidebar: () => void;
    icon?: React.ElementType;
}

export const SidebarSubItem = ({ text, href, closeSidebar, icon: Icon }: Props) => {
    return (
        <NavLink
            to={href}
            onClick={closeSidebar}
            className={({ isActive }) =>
                `flex items-center gap-2 py-3 px-3 text-sm rounded-md transition-colors
                ${isActive ? 'text-casino-gold bg-white/10' : 'text-gray-300 hover:text-casino-gold-light hover:bg-white/5'}`
            }
        >
            {Icon && <Icon size={20} />}
            {text}
        </NavLink>
    );
};