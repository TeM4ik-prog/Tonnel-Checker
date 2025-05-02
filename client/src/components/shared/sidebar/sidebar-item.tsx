import { POSTS_PATHS, Routes, RoutesConfig } from "@/types/pagesConfig";
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
    admin?: boolean;
}

export const SidebarItem = ({ icon: Icon, routeKey, children, admin, closeSidebar }: Props) => {
    const currentPath  = useLocation().pathname
    
    const data = RoutesConfig[routeKey]
    if (!data) return
    let { path, label, subRoutes } = data

    for (let i = 0; i < POSTS_PATHS.length; i++) {
        if(routeKey == POSTS_PATHS[i]){

            path = RoutesConfig.POSTS.path + path
        }
    }


    if (data.admin && !admin) return


    if (!label) return





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
                                className="flex flex-col pl-8 mt-1 gap-1"
                            >
                                {Object.entries(subRoutes).map(([subKey, subRoute]) => (
                                    <SidebarSubItem 
                                        key={subKey} 
                                        text={subRoute.label} 
                                        href={subRoute.path} 
                                        closeSidebar={closeSidebar} 
                                        icon={subRoute.icon}
                                    />
                                ))}
                            </motion.div>
                        </DisclosurePanel>
                    )}
                </>
            )}
        </Disclosure>
    );
};
