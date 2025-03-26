import { useUserData } from "@/store/hooks";
import { updateData } from "@/store/user/user.slice";
import { RoutesConfig } from "@/types/pagesConfig";
import { isPostRoute } from "@/utils";
import { removeTokenFromLocalStorage } from "@/utils/localstorage";
import { LogInIcon, UserCog2 } from "lucide-react";
import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { Button } from "../ui/Button";
import { Sidebar } from "../ui/Sidebar";

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
            let link = !hasSubRoutes ? isPostRoute(key) + path : '#'

            return (
                <>
                    {showInHeader && (
                        <NavLink
                            key={key}
                            to={link}
                            className="relative flex flex-col w-auto group"
                            onMouseEnter={() => handleMouseEnter(key)}
                            onMouseLeave={handleMouseLeave}>
                            <span className="hover:cursor-pointer hover:z-40 text-cyan-400 font-bold text-ellipsis text-lg lg:text-xl relative bottom-0 transition-all duration-300 group-hover:text-cyan-300">
                                {label}
                            </span>
                            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-300 transition-all duration-300 group-hover:w-full"></div>

                            {hasSubRoutes && (
                                <div
                                    className="absolute top-8 left-0 border border-gray-700 bg-gray-800/95 backdrop-blur-sm rounded-lg p-2 z-40 overflow-visible transition-all duration-300 shadow-lg min-w-[200px]"
                                >
                                    {Object.entries(subRoutes).map(([subKey, { path: subPath, label: subLabel }]) => (
                                        <NavLink onClick={handleMouseLeave}
                                            key={subKey}
                                            to={RoutesConfig.POSTS.path + subPath}
                                            className="block text-sm text-gray-300 hover:text-cyan-300 p-2 rounded-md transition-colors duration-200 hover:bg-gray-700/50"
                                        >
                                            {subLabel}
                                        </NavLink>
                                    ))}
                                </div>
                            )}
                        </NavLink>
                    )}
                </>
            )
        })
    ), [hoveredKey]);

    return (
        <header className="fixed top-0 left-0 right-0 flex w-full px-4 py-3 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 shadow-lg z-40">
            {hoveredKey && RoutesConfig[hoveredKey].subRoutes && (
                <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 transition-opacity duration-300"></div>
            )}

            <div className="flex justify-between items-center w-full max-w-7xl mx-auto">
                <div className="flex items-center z-40">
                    <Link to={RoutesConfig.HOME.path} className="group">
                        <img className="w-32 transition-transform duration-300 group-hover:scale-105" src="/web.png" alt="Logo" />
                    </Link>
                </div>

                <div className="flex items-center gap-6">
                    <nav className="hidden md:flex items-center gap-6">
                        {navLinks}
                    </nav>

                    <div className="flex items-center gap-4">
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
