import { Block } from "@/components/layout/Block"
import { PageContainer } from "@/components/layout/PageContainer"

export const ContactPage = () => {
    return (
        <PageContainer title="Связь с нами">
            <Block className="p-4">
                <h2 className="text-2xl font-bold mb-4">Гимназия №1</h2>

                <div className="mt-6">
                    <h3 className="text-lg font-semibold">Наши контакты</h3>
                    <p><span className="font-semibold">Адрес:</span> ул. Школьная, д. 10, г. Москва</p>
                    <p><span className="font-semibold">Телефон:</span> +7 (495) 123-45-67</p>
                    <p><span className="font-semibold">Email:</span>info@gymnasium1.ru</p>
                </div>

                <div className="mt-6">
                    <h3 className="text-lg font-semibold">Наши социальные сети</h3>
                    <ul className="list-disc list-inside">
                        <li><a href="#" className="text-blue-500 hover:underline">ВКонтакте</a></li>
                        <li><a href="#" className="text-blue-500 hover:underline">Facebook</a></li>
                        <li><a href="#" className="text-blue-500 hover:underline">Instagram</a></li>
                    </ul>
                </div>
            </Block>
        </PageContainer>
    )
}
