import { MenuIcon } from "lucide-react";
import { Button } from "../ui/Button";
import { useUserData } from "@/store/hooks";
import { Sidebar } from "../ui/Sidebar";
import { NavLink } from "react-router-dom";
import { RoutesConfig } from "@/types/pagesConfig";
import { useState, useMemo } from "react";
import { removeTokenFromLocalStorage } from "@/utils/localstorage";
import { updateData } from "@/store/user/user.slice";
import { useDispatch } from "react-redux";

export const Header: React.FC = () => {
    const { user } = useUserData();
    const [hoveredKey, setHoveredKey] = useState<string | null>(null)
    const dispatch = useDispatch()

    const handleLogout = () => {
        removeTokenFromLocalStorage(),
            dispatch(updateData()),
            window.location.reload()

    }

    const handleMouseEnter = (key: string) => setHoveredKey(key);
    const handleMouseLeave = () => setHoveredKey(null);

    const navLinks = useMemo(() => (
        Object.entries(RoutesConfig).map(([key, { path, label, subRoutes }]) => (
            <NavLink
                key={key}
                to={path}
                className="relative flex flex-col w-auto"
                onMouseEnter={() => handleMouseEnter(key)}
                onMouseLeave={handleMouseLeave}
            >
                <span className="hover:cursor-pointer text-cyan-400 font-bold underline text-ellipsis text-lg lg:text-2xl relative bottom-0">
                    {label.split(" ")[0]}
                </span>

                {subRoutes && hoveredKey === key && (
                    <div
                        className="absolute top-7 left-0 border bg-gray-600 rounded p-1 z-10 overflow-visible transition-all duration-200"
                    >
                        {Object.entries(subRoutes).map(([subKey, { path: subPath, label: subLabel }]) => (
                            <NavLink
                                key={subKey}
                                to={subPath}
                                className="block text-sm hover:text-gray-300 p-2"
                            >
                                {subLabel}
                            </NavLink>
                        ))}
                    </div>
                )}
            </NavLink>
        ))
    ), [hoveredKey]);

    return (
        <header className="flex w-full px-1 py-3 pb-0 bg-gray-900">
            <div className="flex  justify-center items-center w-full h-full">

                <div className="flex items-center">
                    <img className="min-w-20" src="logo_green.svg" alt="Logo" />
                </div>

                <div className="flex flex-row items-center h-auto gap-2 justify-center relative w-screen">
                    <div className="sm:flex flex-row flex-wrap relative justify-evenly gap-2 mx-3 box-border scrollbar-hide hidden">
                        {navLinks}
                    </div>

                    <div className="flex flex-col ml-auto gap-2 justify-between items-end h-full">
                        {!user ? (
                            <Button text="Войти" routeKey="ENTRY" />
                        ) : (
                            <Button text="Выйти" FC={handleLogout} routeKey="ENTRY" color="red" />
                        )}

                        <Sidebar />
                    </div>

                </div>
            </div>
        </header>
    );
};
