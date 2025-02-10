import { Block } from "@/components/layout/Block";
import { PageContainer } from "@/components/layout/PageContainer";
import { FaViber, FaTelegram, FaSkype, FaVk, FaFacebook, FaOdnoklassniki, FaYoutube } from "react-icons/fa";

export const ContactPage = () => {
    return (
        <PageContainer title="Связь с нами">
            <Block className="p-4">
                <h2 className="text-2xl font-bold mb-4">Государственное учреждение образования «Гимназия №1 имени Ф.Скорины г. Минска»</h2>

                <div className="mt-6">
                    <h3 className="text-lg font-semibold">Наши контакты</h3>
                    <p><span className="font-semibold">Адрес:</span> 220101, Республика Беларусь, г. Минск, пр. Рокоссовского, 138</p>
                    <p><span className="font-semibold">Телефон:</span> (8-017) 379-51-63</p>
                    <p><span className="font-semibold">Email:</span> <a href="mailto:info@schools.by" className="text-blue-500 hover:underline">info@schools.by</a></p>
                </div>

                <div className="mt-6">
                    <h3 className="text-lg font-semibold">Мессенджеры</h3>
                    <div className="flex space-x-4">
                        <a href="viber://chat?number=+375295553713" className="text-blue-500 hover:underline">
                            <FaViber className="inline-block" /> Viber
                        </a>
                        <a href="https://t.me/SchoolsBy" className="text-blue-500 hover:underline">
                            <FaTelegram className="inline-block" /> Telegram
                        </a>
                        <a href="skype:info@schools.by?chat" className="text-blue-500 hover:underline">
                            <FaSkype className="inline-block" /> Skype
                        </a>
                    </div>
                </div>

                <div className="mt-6">
                    <h3 className="text-lg font-semibold">Наши социальные сети</h3>
                    <div className="flex space-x-4">
                        <a href="https://vk.com/schools.belarus" className="text-blue-500 hover:underline">
                            <FaVk className="inline-block" /> ВКонтакте
                        </a>
                        <a href="https://t.me/schools_by" className="text-blue-500 hover:underline">
                            <FaTelegram className="inline-block" /> Telegram
                        </a>
                        <a href="https://web.facebook.com/schoolsofficial" className="text-blue-500 hover:underline">
                            <FaFacebook className="inline-block" /> Facebook
                        </a>
                        <a href="https://invite.viber.com/?g2=AQAfINDjqkIrFEwfI5WUutBgpJy93mYHlJ1OtuUzmdyWc5%2FF2MIGFwZhtwAz6LFK" className="text-blue-500 hover:underline">
                            <FaViber className="inline-block" /> Viber
                        </a>
                        <a href="https://ok.ru/group/58749605445821" className="text-blue-500 hover:underline">
                            <FaOdnoklassniki className="inline-block" /> Одноклассники
                        </a>
                        <a href="https://www.youtube.com/channel/UCAnOE5f5KZAzCKKPaCBhQ9Q" className="text-blue-500 hover:underline">
                            <FaYoutube className="inline-block" /> YouTube
                        </a>
                    </div>
                </div>
            </Block>
        </PageContainer>
    );
};