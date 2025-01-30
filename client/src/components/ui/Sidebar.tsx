import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { AtomIcon, Home, HomeIcon, MenuIcon, SidebarClose, BellIcon, Bell, ContactIcon, GlobeIcon, GroupIcon, HistoryIcon, TrophyIcon } from 'lucide-react';
import { Fragment, useState } from 'react';
import { SidebarItem } from '../shared/sidebar/sidebar-item';

export const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const openSidebar = () => setIsOpen(true);
    const closeSidebar = () => setIsOpen(false);


    const sidebarItems = [
        { icon: <HomeIcon size={20} />, routeKey: "HOME" },
        { icon: <TrophyIcon size={20} />, routeKey: "ACHIEVEMENTS" },
        { icon: <HistoryIcon size={20} />, routeKey: "HISTORY" },
        { icon: <HistoryIcon size={20} />, routeKey: "GYMN_HISTORY" },
        { icon: <GroupIcon size={20} />, routeKey: "PATRIOTISM" },
        { icon: <Bell size={20} />, routeKey: "ANNOUNCEMENTS" },
        { icon: <GlobeIcon size={20} />, routeKey: "INTERNATIONAL_COOPERATION" },
        { icon: <ContactIcon size={20} />, routeKey: "CONTACTS" },
    ];

    return (
        <>
            {isOpen && <div className="fixed inset-0 bg-black z-50 opacity-50 border-none" />}

            <div className="relative border-none inset-0 z-20">
                <MenuIcon onClick={openSidebar} size={30} />

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
                            <DialogPanel className="bg-gray-800  w-full  h-full p-5 text-white md:w-80">

                                <div className="flex justify-between items-center mb-5">
                                    {/* <DialogTitle className="text-xl font-bold">Sidebar</DialogTitle> */}
                                    <SidebarClose className='ml-auto' onClick={closeSidebar} size={28} />
                                </div>


                                <div className="flex flex-col gap-3">
                                    {sidebarItems.map(({ icon, routeKey }) => (
                                        <SidebarItem key={routeKey} icon={icon} routeKey={routeKey} closeSidebar={closeSidebar} />
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


