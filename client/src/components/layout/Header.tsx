import { Logo } from "./Logo";
import { Sidebar } from "../ui/Sidebar";
import { useUserData } from "@/store/hooks";

export const Header: React.FC = () => {
    const { user } = useUserData();

    return (
        <header className="flex w-full p-2 pb-0 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 shadow-lg z-40">
            <div className="flex justify-center items-center w-full h-full">
                <Logo className="p-1" />
                <Sidebar />
            </div>
        </header>
    );
};
