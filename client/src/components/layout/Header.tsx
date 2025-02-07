import { LogInIcon, LogOut, MenuIcon, UserCog2 } from "lucide-react";
import { Button } from "../ui/Button";
import { useUserData } from "@/store/hooks";
import { Sidebar } from "../ui/Sidebar";
import { Link, NavLink } from "react-router-dom";
import { RoutesConfig } from "@/types/pagesConfig";
import { useState, useMemo } from "react";
import { removeTokenFromLocalStorage } from "@/utils/localstorage";
import { updateData } from "@/store/user/user.slice";
import { useDispatch } from "react-redux";
import { observe } from "react-intersection-observer";

export const Header: React.FC = () => {
    const { user } = useUserData();
    const [hoveredKey, setHoveredKey] = useState<string | null>(null);
    const dispatch = useDispatch();

    const handleLogout = () => {
        removeTokenFromLocalStorage();
        dispatch(updateData());
        window.location.reload();
    };

    const handleMouseEnter = (key: string) => setHoveredKey(key);
    const handleMouseLeave = () => setHoveredKey(null);

    const navLinks = useMemo(() => (
        Object.entries(RoutesConfig).map(([key, { path, label, showInHeader, subRoutes }]) => {

            const hasSubRoutes = subRoutes && hoveredKey === key

            return (
                <>
                    {showInHeader && (
                        <NavLink
                            key={key}
                            to={!hasSubRoutes ? RoutesConfig.POSTS.path + path : '#'}
                            className="relative flex flex-col w-auto"
                            onMouseEnter={() => handleMouseEnter(key)}
                            onMouseLeave={handleMouseLeave}>

                            <span className="hover:cursor-pointer hover:z-40 text-cyan-400 font-bold text-ellipsis text-lg lg:text-xl relative bottom-0">
                                {label}
                            </span>

                            {hasSubRoutes && (
                                <div
                                    className="absolute top-7 left-0 border bg-gray-600 rounded p-1 z-40 overflow-visible transition-all duration-200"
                                >
                                    {Object.entries(subRoutes).map(([subKey, { path: subPath, label: subLabel }]) => (
                                        <NavLink onClick={handleMouseLeave}
                                            key={subKey}
                                            to={RoutesConfig.POSTS.path + subPath}
                                            className="block text-sm hover:text-gray-300 p-2"
                                        >
                                            {subLabel}
                                        </NavLink>
                                    ))}
                                </div>
                            )}
                        </NavLink>
                    )
                    }
                </>
            )
        })
    ), [hoveredKey]);

    return (
        <header className="flex w-full px-1 py-3 pb-0 bg-gray-900">
            {hoveredKey && RoutesConfig[hoveredKey].subRoutes && (
                <div className="fixed inset-0 bg-black z-30 opacity-50 transition-opacity duration-300"></div>
            )}

            <div className="flex justify-center items-center w-full h-full">

                <div className="flex items-center z-10 h-full">
                    <Link to={RoutesConfig.HOME.path}>
                        <img className="w-32" src="/logo_green.svg" alt="Logo" />
                    </Link>
                </div>

                <div className="flex flex-row items-center h-auto gap-2 justify-end relative w-screen">
                    <div className="sm:flex flex-row flex-wrap relative justify-center gap-x-6 mx-3 box-border scrollbar-hide hidden">
                        {navLinks}
                    </div>

                    <div className="flex flex-col gap-2 ml-auto justify-between self-center items-end h-full">
                        {!user ? (
                            <Button text="Войти" icon={<LogInIcon />} routeKey="ENTRY" />
                        ) : (
                            <Button text="Профиль" icon={<UserCog2 />} routeKey="PROFILE" />
                        )}

                        <Sidebar />
                    </div>

                </div>
            </div>
        </header>
    );
};
