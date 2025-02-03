import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { AtomIcon, Home, HomeIcon, MenuIcon, SidebarClose, BellIcon, Bell, ContactIcon, GlobeIcon, GroupIcon, HistoryIcon, TrophyIcon, BuildingIcon, FlagIcon, BookIcon, PenIcon, PodcastIcon, ClubIcon } from 'lucide-react';
import { Fragment, useState } from 'react';
import { SidebarItem } from '../shared/sidebar/sidebar-item';
import { RouteKey, RoutesConfig } from '@/types/pagesConfig';

export const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const openSidebar = () => setIsOpen(true);
    const closeSidebar = () => setIsOpen(false);


    return (
        <>
            {isOpen && <div className="fixed inset-0 bg-black z-50 opacity-50 border-none" />}

            <div className="relative border-none inset-0 z-20">
                <MenuIcon onClick={openSidebar} size={40} />

                <Transition show={isOpen} as={Fragment}
                    enter="transition-transform duration-700"
                    enterFrom="-translate-x-full"
                    enterTo="translate-x-0"
                    leave="transition-transform duration-500"
                    leaveFrom="translate-x-0"
                    leaveTo="-translate-x-full"
                >


                    <Dialog as="div" className="fixed inset-0 z-50 outline-none" onClose={closeSidebar}>

                        <div className="fixed inset-0 flex items-start justify-start">
                            <DialogPanel className="bg-gray-800 w-full overflow-y-auto h-full p-5 text-white md:w-80">

                                <div className="sticky justify-between items-center mb-5">
                                    {/* <DialogTitle className="text-xl font-bold">Sidebar</DialogTitle> */}
                                    <SidebarClose className='ml-auto' onClick={closeSidebar} size={28} />
                                </div>


                                <div className="flex flex-col gap-3">
                                    {Object.entries(RoutesConfig).map(([routeKey, route]) => (
                                        <SidebarItem key={routeKey} icon={route.icon} routeKey={routeKey} closeSidebar={closeSidebar} />
                                    ))}
                                </div>



                            </DialogPanel>
                        </div>
                    </Dialog>
                </Transition>
            </div >
        </>
    );
};


