import { RoutesConfig } from "@/types/pagesConfig";

import { FaGithub } from "react-icons/fa";
import { Button } from "../ui/Button";

export const Footer: React.FC = () => {
    return (
        <footer className="flex flex-col justify-center items-center gap-3 bg-gray-900 text-gray-100 p-4 mt-auto md:flex-row">

            {/* <Button className="h-min" text='TeM4ik' icon={<FaGithub size={30} />} href="https://github.com/TeM4ik-prog" /> */}




            <div className="mb-4 md:mb-0">
                <p>&copy; 2025 Webky. Веб</p>
            </div>
            <div className="flex w-full flex-wrap space-x-4 justify-center">

                {
                    Object.entries(RoutesConfig).map(([key, { path, label, showInHeader, subRoutes }]) => (
                        <>
                            {showInHeader && (
                                <a key={key} href={RoutesConfig.POSTS.path + path} className="hover:text-cyan-400 transition-colors">
                                    {label}
                                </a>
                            )}

                        </>
                    ))


                }





                {/* <a href="#about" className="hover:text-cyan-400 transition-colors">О нас</a>
                    <a href="#contact" className="hover:text-cyan-400 transition-colors">Контакты</a>
                    <a href="#privacy" className="hover:text-cyan-400 transition-colors">Политика конфиденциальности</a> */}
            </div>

        </footer>
    );
};
