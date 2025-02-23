import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";

const NotFoundPage = () => {
    return (
        <Section>
                <div className="max-w-sm">
                    <h1 className="text-6xl font-bold mb-4">404</h1>
                    <p className="text-xl mb-6">Страница не найдена</p>
                    <p className="text-lg mb-8">Извините, но страница, которую вы ищете, не существует или была перемещена.</p>
                    <Button text="Вернуться на главную" routeKey="HOME" />
                </div>
        </Section>
    );
};

export default NotFoundPage
