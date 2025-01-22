import { MenuIcon } from "lucide-react";
import { Button } from "../ui/Button";
import { useUserData } from "@/store/hooks";
import { Sidebar } from "../ui/Sidebar";
import { NavLink } from "react-router-dom";
import { Routes, RoutesConfig, RouteWithSubRoutes } from "@/types/pagesConfig";

export const Header: React.FC = () => {
    const { user } = useUserData();
    console.log(user);

    return (
        <header className="max-w-full px-4 py-3 bg-gray-900 w-screen">
            <div className="flex justify-between items-center">

                <div className="flex items-center">
                    <img className="h-20 w-20 min-w-20" src="logo_green.svg" alt="Logo" />
                </div>

                <div className="flex flex-row items-end gap-2 overflow-hidden">

                    {Object.entries(RoutesConfig).map(([key, {path, label, subRoutes}]) => {
                        // const { path, label, subRoutes } = value as RouteWithSubRoutes;

                        console.log(path, label, subRoutes);
                        return (
                            <NavLink
                                key={key}
                                to={path}
                                className="relative flex justify-end text-nowrap flex-shrink-0 group"
                            >
                                <span className="hover:cursor-pointer">{label.slice}</span>

                                {subRoutes && (
                                    <div className="absolute left-0 hidden group-hover:block bg-black text-white rounded-md p-2 shadow-lg">
                                        <div className="flex flex-col gap-2">
                                            {Object.entries(subRoutes).map(([subKey, { path: subPath, label: subLabel }]) => (
                                                <NavLink
                                                    key={subKey}
                                                    to={subPath}
                                                    className="text-sm hover:text-gray-300"
                                                >
                                                    {subLabel}
                                                </NavLink>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </NavLink>
                        );
                    })}






                    <div className="flex flex-col gap-2 items-end">

                        {user ? (
                            <Button text="Войти" routeKey="ENTRY" />
                        ) : (
                            <Button text="Выйти" routeKey="ENTRY" color="red" />
                        )}


                        <Sidebar />
                    </div>




                </div>
            </div>
        </header>
    );
};
