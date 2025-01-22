import { Routes, RoutesConfig } from "@/types/pagesConfig";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

interface Props {
    icon: JSX.Element;
    routeKey: keyof Routes;
    children?: ReactNode;
}

export const SidebarItem = ({ icon, routeKey, children }: Props) => {
    const { path, label } = RoutesConfig[routeKey];

    return (
        <Disclosure as="div" className="w-full">
            {({ open }) => (
                <>
                    <div className="flex items-center justify-between w-full p-2 rounded hover:bg-gray-700 transition">
                        {children ? (
                            <DisclosureButton className="flex items-center w-full text-left">
                                {icon}
                                <span className="ml-3">{label}</span>
                            </DisclosureButton>
                        ) : (
                            <NavLink to={path} className="flex items-center w-full">
                                {icon}
                                <span className="ml-3">{label}</span>
                            </NavLink>
                        )}

                        {children && (
                            <DisclosureButton className="p-1">
                                <ChevronDown
                                    size={18}
                                    className={`transition-transform ${open ? "rotate-180" : ""}`}
                                />
                            </DisclosureButton>
                        )}
                    </div>

                    <DisclosurePanel className="flex flex-col gap-2 pl-6 ">
                        {children}
                    </DisclosurePanel>
                </>
            )}
        </Disclosure>
    );
};
