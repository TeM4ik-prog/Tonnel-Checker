import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { RoutesConfig } from "@/types/pagesConfig";

export const NotFoundPage = () => {
    return (

        <Section>
            {/* <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-700 to-gray-900 text-white text-center"> */}
                <div className="max-w-sm">
                    <h1 className="text-6xl font-bold mb-4">404</h1>
                    <p className="text-xl mb-6">Страница не найдена</p>
                    <p className="text-lg mb-8">Извините, но страница, которую вы ищете, не существует или была перемещена.</p>


                    <Button text="Вернуться на главную" routeKey="HOME" />


                </div>
            {/* </div> */}
        </Section>
    );
};
