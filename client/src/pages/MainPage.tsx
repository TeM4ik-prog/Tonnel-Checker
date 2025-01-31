import { Button } from "@/components/ui/Button"
import { Modal } from "@/components/ui/Dialog";
import { Section } from "@/components/ui/Section";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ContentBlock from "@/components/ui/ContentBlock";

export const MainPage: React.FC = () => {


    return (
        <>

            <ContentBlock>
                <Section>
                    <motion.section className="relative max-h-full w-full gap-4 h-screen  bg-cover bg-center flex flex-col items-center justify-center text-center rounded"
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
                        <div className="absolute inset-0 bg-black opacity-50"></div>

                        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-red-300 to-green-500 text-transparent bg-clip-text z-10">
                            Время выбрало нас!
                        </h1>
                        <p className="text-lg md:text-xl max-w-2xl z-10">
                            Мы воспитываем патриотов, развиваем традиции и передаем культурное наследие Беларуси.
                        </p>

                        <Button color="red" text="Интервью учащихся" />



                    </motion.section>

                </Section>

            </ContentBlock>






            <ContentBlock>

                <section className="container mx-auto py-16 text-center">
                    <h2 className="text-4xl font-bold text-green-400">О нашей гимназии</h2>
                    <p className="mt-4 text-lg max-w-3xl mx-auto">
                        Гимназия №1 — это место, где традиции встречаются с современными образовательными методиками.
                        Мы воспитываем в наших учениках любовь к Родине, уважение к истории и стремление к знаниям.
                    </p>
                    <img
                        src="/school.webp"
                        alt="Гимназия №1"
                        className="mt-8 rounded shadow-lg w-full max-w-4xl mx-auto"
                    />
                </section>

            </ContentBlock>


            <ContentBlock>


                <section className="bg-gray-800 py-16 px-6 text-center">
                    <h2 className="text-4xl font-bold text-red-400">Наши достижения</h2>
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        <div className="p-6 bg-gray-700 rounded-lg shadow-lg">
                            <h3 className="text-xl font-semibold">🏆 Олимпиады</h3>
                            <p className="mt-2">100+ побед на республиканских олимпиадах.</p>
                        </div>
                        <div className="p-6 bg-gray-700 rounded-lg shadow-lg">
                            <h3 className="text-xl font-semibold">🎭 Культура</h3>
                            <p className="mt-2">Ежегодные концерты и театральные постановки.</p>
                        </div>
                        <div className="p-6 bg-gray-700 rounded-lg shadow-lg">
                            <h3 className="text-xl font-semibold">⚽ Спорт</h3>
                            <p className="mt-2">Победители городских и областных соревнований.</p>
                        </div>
                    </div>
                </section>

            </ContentBlock>




            {/* <Modal /> */}



        </>
    )
}