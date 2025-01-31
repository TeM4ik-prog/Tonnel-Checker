import { Routes, RoutesConfig } from "@/types/pagesConfig";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import { ReactNode } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { SidebarSubItem } from "./sidebar-sub-item";

interface Props {
    icon?: React.ElementType;
    routeKey: keyof Routes;
    children?: ReactNode;
    closeSidebar: () => void;
}

export const SidebarItem = ({ icon: Icon, routeKey, children, closeSidebar }: Props) => {
    const currentPath  = useLocation().pathname
    
    
    const data = RoutesConfig[routeKey]
    if (!data) return
    const { path, label, subRoutes } = data

    if(!label) return



    


    return (
        <Disclosure as="div" className="w-full">
            { ({ open }) => (
                <>
                    <div className={`flex ${currentPath == path ? "bg-gray-600" : ''} items-center justify-between w-full p-2 rounded hover:bg-gray-700 transition`}>
                        {subRoutes ? (
                            <DisclosureButton className="flex items-center w-full text-left ">
                                {Icon && <Icon size={20} />}
                                <span className="ml-3">{label}</span>
                            </DisclosureButton>
                        ) : (
                            <NavLink to={path} className="flex items-center w-full" onClick={closeSidebar}>
                                {Icon && <Icon size={20} />}
                                <span className="ml-3">{label}</span>
                            </NavLink>
                        )}

                        {subRoutes && (
                            <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
                                <DisclosureButton className="p-1">
                                    <ChevronDown size={18} />
                                </DisclosureButton>
                            </motion.div>
                        )}
                    </div>

                    {subRoutes && (
                        <DisclosurePanel>
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: open ? 1 : 0, y: open ? 0 : -10 }}
                                transition={{ duration: 0.3 }}
                                className="flex flex-col gap-2 pl-6 overflow-hidden"
                            >
                                {Object.entries(subRoutes).map(([subKey, { path, label }]) => (
                                    <SidebarSubItem key={subKey} text={label} href={path} closeSidebar={closeSidebar} />
                                ))}
                            </motion.div>
                        </DisclosurePanel>
                    )}
                </>
            )}
        </Disclosure>
    );
};
