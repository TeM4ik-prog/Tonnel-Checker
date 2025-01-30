import { Routes, RoutesConfig } from "@/types/pagesConfig";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { SidebarSubItem } from "./sedebar-sub-item";

interface Props {
    icon: JSX.Element;
    routeKey: keyof Routes;
    children?: ReactNode;
    closeSidebar: () => void;
}

export const SidebarItem = ({ icon, routeKey, children, closeSidebar }: Props) => {
    const { path, label, subRoutes } = RoutesConfig[routeKey]

    return (
        <Disclosure as="div" className="w-full">
            {({ open }) => (
                <>
                    <div className="flex items-center justify-between w-full p-2 rounded hover:bg-gray-700 transition">
                        {subRoutes ? (
                            <DisclosureButton className="flex items-center w-full text-left">
                                {icon}
                                <span className="ml-3">{label}</span>
                            </DisclosureButton>
                        ) : (
                            <NavLink to={path} className="flex items-center w-full" onClick={closeSidebar}>
                                {icon}
                                <span className="ml-3">{label}</span>
                            </NavLink>
                        )}

                        {subRoutes && (
                            <DisclosureButton className="p-1">
                                <ChevronDown
                                    size={18}
                                    className={`transition-transform ${open ? "rotate-180" : ""}`}
                                />
                            </DisclosureButton>
                        )}
                    </div>

                    {subRoutes && (
                        <DisclosurePanel className="flex flex-col gap-2 pl-6 " >
                            {Object.entries(subRoutes).map(([subKey, { path, label }]) => (
                                <SidebarSubItem key={subKey} text={label} href={path} closeSidebar={closeSidebar}  />
                            ))}
                        </DisclosurePanel>
                    )}

                </>
            )}
        </Disclosure>
    );
};
