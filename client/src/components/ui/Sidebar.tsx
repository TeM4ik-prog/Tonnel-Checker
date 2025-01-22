import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { AtomIcon, Home, HomeIcon, MenuIcon, SidebarClose, BellIcon, Bell, ContactIcon, GlobeIcon, GroupIcon, HistoryIcon, TrophyIcon } from 'lucide-react';
import { Fragment, useState } from 'react';
import { SidebarItem } from '../shared/sidebar/sidebar-item';
import { SidebarSubItem } from '../shared/sidebar/sedebar-sub-item';
import { RoutesConfig } from '@/types/pagesConfig';

export const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const openSidebar = () => setIsOpen(true);
    const closeSidebar = () => setIsOpen(false);

    return (
        <>
            {isOpen && <div className="fixed inset-0 bg-black opacity-50 border-none" />}

            <div className="relative border-none inset-0">
                <MenuIcon onClick={openSidebar} size={30} />

                <Transition show={isOpen} as={Fragment}
                    enter="transition-transform duration-700"
                    enterFrom="-translate-x-full"
                    enterTo="translate-x-0"
                    leave="transition-transform duration-500"
                    leaveFrom="translate-x-0"
                    leaveTo="-translate-x-full"
                >


                    <Dialog as="div" className="fixed inset-0 z-50 outline-none " onClose={closeSidebar}>

                        <div className="fixed inset-0 flex items-start justify-start">
                            <DialogPanel className="bg-gray-800  w-full  h-full p-5 text-white md:w-80">

                                <div className="flex justify-between items-center mb-5">
                                    {/* <DialogTitle className="text-xl font-bold">Sidebar</DialogTitle> */}
                                    <SidebarClose className='ml-auto' onClick={closeSidebar} size={28} />
                                </div>

//FIXME later change

                                <div className="flex flex-col gap-3">
                                    <SidebarItem icon={<HomeIcon size={20} />} routeKey="HOME" />

                                    <SidebarItem icon={<TrophyIcon size={20} />} routeKey="ACHIEVEMENTS">
                                        <SidebarSubItem href={RoutesConfig.ANNOUNCEMENTS.subRoutes!.ANNOUNCEMENTS_NEWS.path} text={'text'} />
                                    </SidebarItem>

                                    <SidebarItem icon={<HistoryIcon size={20} />} routeKey="HISTORY" />

                                    <SidebarItem icon={<GroupIcon size={20} />} routeKey="PATRIOTISM" />

                                    {/* <SidebarItem icon={<Bell size={20} />} routeKey="ANNOUNCEMENTS">
                                        <SidebarSubItem href={RoutesConfig.ANNOUNCEMENTS_NEWS.path} text={RoutesConfig.ANNOUNCEMENTS_NEWS.label} />
                                        <SidebarSubItem href={RoutesConfig.ANNOUNCEMENTS_EVENTS.path} text={RoutesConfig.ANNOUNCEMENTS_EVENTS.label} />
                                    </SidebarItem> */}

                                    <SidebarItem icon={<GlobeIcon size={20} />} routeKey="INTERNATIONAL_COOPERATION" />

                                    <SidebarItem icon={<ContactIcon size={20} />} routeKey="CONTACTS" />
                                </div>



                            </DialogPanel>
                        </div>
                    </Dialog>
                </Transition>
            </div >
        </>
    );
};


