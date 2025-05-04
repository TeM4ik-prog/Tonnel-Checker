import { RoutesConfig } from '@/types/pagesConfig';
import { Dialog, DialogPanel, Transition } from '@headlessui/react';
import { MenuIcon, SidebarClose } from 'lucide-react';
import { Fragment, useState } from 'react';
import { SidebarItem } from '../shared/sidebar/sidebar-item';
import { useUserData } from '@/store/hooks';
import { UserRoles } from '@/types';

export const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useUserData()
    const openSidebar = () => setIsOpen(true);
    const closeSidebar = () => setIsOpen(false);

    return (
        <div className='z-50'>
            <MenuIcon onClick={openSidebar} size={40} />

            <Transition show={isOpen} as={Fragment}>
                <Dialog as="div" className="fixed inset-0 z-50" onClose={closeSidebar}>
                    {isOpen && <div className="fixed inset-0 bg-black/50" />}


                    <Transition.Child
                        as={Fragment}
                        enter="transition-transform duration-500"
                        enterFrom="-translate-x-full"
                        enterTo="translate-x-0"
                        leave="transition-transform duration-500"
                        leaveFrom="translate-x-0"
                        leaveTo="-translate-x-full"
                    >

                        <DialogPanel className="fixed inset-y-0 left-0 flex w-full flex-col sm:max-w-sm">
                            <div className="fixed inset-0 flex items-start justify-start">
                                <DialogPanel className="bg-gray-900 w-full overflow-y-auto h-full p-5 text-white md:w-80">
                                    <div className="sticky justify-between items-center mb-5">
                                        <SidebarClose className='ml-auto' onClick={closeSidebar} size={28} />
                                    </div>

                                    <div className="flex flex-col gap-3">
                                        {Object.entries(RoutesConfig).map(([routeKey, route]) => (
                                            route.disabled ? null : <SidebarItem key={routeKey} icon={route.icon} routeKey={routeKey} admin={user?.role == UserRoles.Admin} closeSidebar={closeSidebar} />
                                        ))}
                                    </div>
                                </DialogPanel>
                            </div>
                        </DialogPanel>
                    </Transition.Child>
                </Dialog>
            </Transition>
        </div>
    );
};


