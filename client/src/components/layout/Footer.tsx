import { RoutesConfig } from "@/types/pagesConfig";
import { FaGithub, FaInstagram, FaTelegram, FaVk } from "react-icons/fa";

export const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-900 text-gray-100">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* О нас */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-cyan-400">Webky</h3>
                        <p className="text-gray-400">
                            {/* Современная платформа для обмена знаниями и опытом в сфере веб-разработки. */}
                        </p>
                    </div>

                    {/* Быстрые ссылки */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-cyan-400">Быстрые ссылки</h3>
                        <ul className="space-y-2">
                            {Object.entries(RoutesConfig).map(([key, { path, label, showInHeader }]) => (
                                showInHeader && (
                                    <li key={key}>
                                        <a 
                                            href={RoutesConfig.POSTS.path + path} 
                                            className="text-gray-400 hover:text-cyan-400 transition-colors"
                                        >
                                            {label}
                                        </a>
                                    </li>
                                )
                            ))}
                        </ul>
                    </div>

                    {/* Контакты */}
                    {/* <div className="space-y-4">
                        <h3 className="text-xl font-bold text-cyan-400">Контакты</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li>Email: support@webky.ru</li>
                            <li>Телефон: +7 (XXX) XXX-XX-XX</li>
                            <li>Адрес: г. Москва</li>
                        </ul>
                    </div> */}

                    {/* Социальные сети */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-cyan-400">Мы в соцсетях</h3>
                        <div className="flex space-x-4">
                            <a 
                                href="#" 
                                className="text-gray-400 hover:text-cyan-400 transition-colors"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaTelegram size={24} />
                            </a>
                            <a 
                                href="#" 
                                className="text-gray-400 hover:text-cyan-400 transition-colors"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaVk size={24} />
                            </a>
                            <a 
                                href="#" 
                                className="text-gray-400 hover:text-cyan-400 transition-colors"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaInstagram size={24} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Нижняя часть футера */}
                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                    <p>&copy; {new Date().getFullYear()} Webky. Все права защищены.</p>
                </div>
            </div>
        </footer>
    );
};
