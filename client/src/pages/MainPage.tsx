import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Dialog";
import { Section } from "@/components/ui/Section";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ContentBlock from "@/components/ui/ContentBlock";
import { RoutesConfig } from "@/types/pagesConfig";
import { Loader } from "@/components/ui/Loader";

export const MainPage: React.FC = () => {
    return (
        <>
            <ContentBlock>
                <Section>
                    <motion.section
                        className="relative max-h-full w-full h-screen gap-4 bg-cover bg-center flex flex-col items-center justify-center text-center rounded overflow-hidden before:absolute before:inset-0 before:bg-black/50 before:backdrop-blur-sm"
                        style={{
                            backgroundImage: "url('/belarusPhoto.jpg')",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                        animate={{
                            backgroundPosition: ["0% 0%", "50% 50%", "100% 100%", "0% 0%"],
                        }}
                        transition={{
                            duration: 60,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    >
                        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-red-300 to-green-500 text-transparent bg-clip-text z-10">
                            Время выбрало нас!
                        </h1>
                        <p className="text-lg md:text-xl max-w-2xl z-10">
                            Любим своё Отечество, сохраняем традиции, ценим настоящее, строим будущее
                        </p>

                        <Button color="red" text="Патриотизм - это..." formSubmit={false} href={RoutesConfig.INTERVIEWS.path} />
                    </motion.section>


                </Section>

            </ContentBlock>

            <ContentBlock>
                <motion.section
                    className="container mx-auto py-16 text-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    <h2 className="text-4xl font-bold text-green-400">О нашей гимназии</h2>
                    <p className="mt-4 text-lg max-w-3xl mx-auto">
                        Гимназия №1 — это место, где традиции встречаются с современными образовательными методиками.
                        Мы воспитываем в наших учениках любовь к Родине, уважение к истории и стремление к знаниям.
                    </p>
                    <motion.img
                        src="/school.webp"
                        alt="Гимназия №1"
                        className="mt-8 rounded shadow-lg w-full max-w-4xl mx-auto"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                    />
                </motion.section>
            </ContentBlock>

            <ContentBlock>
                <motion.section
                    className="bg-gray-800 py-16 px-6 text-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    <h2 className="text-4xl font-bold text-red-400">Наши достижения</h2>
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {[
                            { title: "🏆 Олимпиады", text: "Наши ученики побеждают в олимпиадах." },
                            { title: "🎭 Культура", text: "Проводим концерты и праздники." },
                            { title: "⚽ Спорт", text: "Есть секции по разным видам спорта." },
                            { title: "📖 Учёба", text: "Помогаем школьникам добиваться успехов." },
                            { title: "👨‍🏫 Учителя", text: "Опытные и заботливые педагоги." },
                            { title: "🎉 Мероприятия", text: "Часто проводим интересные события." },
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                className="p-6 bg-gray-700 rounded-lg shadow-lg"
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, delay: index * 0.3 }}
                            >
                                <h3 className="text-xl font-semibold">{item.title}</h3>
                                <p className="mt-2">{item.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>
            </ContentBlock>

            <ContentBlock>
                <motion.section
                    className="container flex flex-col mx-auto py-16 text-center gap-5"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    <h2 className="text-4xl font-bold text-blue-400">Мы есть в Telegram</h2>
                    <motion.img
                        src="/telegramGymnLogo.jpg"
                        alt="Telegram-канал"
                        className="w-32 mx-auto rounded-full"
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                    />
                    <p className="text-lg max-w-3xl mx-auto">
                        Подписывайтесь на наш Telegram-канал, чтобы быть в курсе последних новостей и событий гимназии.
                    </p>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 1 }}
                    >
                        <Button text="Перейти в Telegram" href="https://t.me/gymn1minsk" />
                    </motion.div>
                </motion.section>
            </ContentBlock>
        </>
    );
};