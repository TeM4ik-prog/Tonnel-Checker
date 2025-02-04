import { RoutesConfig } from "@/types/pagesConfig";

export const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-900 text-gray-100 p-4 mt-auto">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                    <p>&copy; 2025 Моя Гимназия. Все права защищены.</p>
                </div>
                <div className="flex w-full flex-wrap space-x-4 justify-center">

                    {
                        Object.entries(RoutesConfig).map(([key, { path, label, showInHeader, subRoutes }]) => (
                            <>
                                {showInHeader && (
                                    <a key={key} href={path} className="hover:text-cyan-400 transition-colors">
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
            </div>
        </footer>
    );
};
