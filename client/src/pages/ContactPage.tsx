import { Block } from "@/components/layout/Block"
import { PageContainer } from "@/components/layout/PageContainer"

export const ContactPage = () => {
    return (
        <PageContainer title="Связь с нами">
            <Block className="p-4">
                <h2 className="text-2xl font-bold mb-4">Государственное учреждение образования «Гимназия №1 имени Ф.Скорины
                    г. Минска»

                </h2>

                <div className="mt-6">
                    <h3 className="text-lg font-semibold">Наши контакты</h3>
                    <p><span className="font-semibold">Адрес:</span> 220101, Республика Беларусь, г. Минск,
                        пр. Рокоссовского,138

                    </p>
                    <p><span className="font-semibold">Телефон:</span>(8-017)379-51-63</p>
                    <p><span className="font-semibold">Email:</span>gymn1@minsk.edu.by</p>
                </div>

                <div className="mt-6">
                    <h3 className="text-lg font-semibold">Наши социальные сети</h3>
                    <ul className="list-disc list-inside">
                        <li><a href="https://t.me/gymn1minsk" className="text-blue-500 hover:underline">Telegram</a></li>
                        <li><a href="https://www.instagram.com/gymn1inst" className="text-blue-500 hover:underline">Instagram</a></li>
                    </ul>
                </div>
            </Block>
        </PageContainer>
    )
}
