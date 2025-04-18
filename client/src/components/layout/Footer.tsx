import { motion } from "framer-motion";
import { FaTelegram } from "react-icons/fa";
import { Logo } from "./Logo";
import { Button } from "../ui/Button";

export const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-900/95 text-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 py-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">

                    <div className="space-y-4">
                        <Logo />
                        <p className="text-gray-400">
                            Безопасный P2P обмен криптовалют для вашего бизнеса
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text">
                            Связаться с нами
                        </h3>

                        <Button
                            className="mr-auto"
                            text=""
                            openNewPage={true}
                            href=""
                            icon={<FaTelegram size={24} className="relative z-10" />}
                        />
                    </div>
                </div>

                <div className="border-t border-gray-800/50 pt-4 text-center">
                    <p>&copy; {new Date().getFullYear()} Dark Project. Все права защищены.</p>
                </div>
            </div>
        </footer>
    );
};
