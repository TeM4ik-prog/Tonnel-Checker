import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { motion } from "framer-motion";
import { FaExchangeAlt } from "react-icons/fa";

const MainPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-[#0a0a0a] gap-4 text-white overflow-hidden">
            <Section className="relative overflow-hidden gap-5">
                <div className="absolute inset-0">
                    <div className="absolute inset-0">
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent animate-[slideRight_3s_ease-in-out_infinite]" />
                        <div className="absolute top-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent animate-[slideLeft_4s_ease-in-out_infinite]" />
                        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent animate-[slideRight_5s_ease-in-out_infinite]" />
                        <div className="absolute top-3/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent animate-[slideLeft_6s_ease-in-out_infinite]" />
                    </div>

                    <div className="absolute inset-0">
                        {[...Array(10)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-1 h-1 bg-white/10 rounded-full"
                                initial={{
                                    x: Math.random() * window.innerWidth,
                                    y: Math.random() * window.innerHeight,
                                    scale: 0,
                                }}
                                animate={{
                                    x: Math.random() * window.innerWidth,
                                    y: Math.random() * window.innerHeight,
                                    scale: [0, 4, 0],
                                }}
                                transition={{
                                    duration: 5 + Math.random() * 5,
                                    repeat: Infinity,
                                    ease: "linear",
                                    delay: Math.random() * 2,
                                }}
                            />
                        ))}
                    </div>
                </div>

                <motion.div
                    className="relative z-10 text-center px-4 w-full max-w-6xl mx-auto"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                >

                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-2xl rounded-full" />
                        <motion.h1
                            className="relative p-5 text-8xl sm:text-9xl md:text-[10rem] lg:text-[12rem] font-bold text-white"
                            animate={{
                                textShadow: [
                                    "0 0 20px rgba(147,51,234,0.5)",
                                    "0 0 40px rgba(59,130,246,0.5)",
                                    "0 0 20px rgba(147,51,234,0.5)",
                                ],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        >
                            Dark Project
                        </motion.h1>
                    </motion.div>


                    <motion.p
                        className="text-xl sm:text-2xl md:text-3xl text-gray-400 mb-8 sm:mb-12 font-light px-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                    >
                        Откройте для себя мир криптообмена, где каждое действие приближает вас к успеху
                    </motion.p>


                    <Button
                        text="Страница агента"
                        href="https://obmencrypto445.ru/login.php"
                        openNewPage={true}
                        icon={<FaExchangeAlt className="text-xl sm:text-2xl transition-transform group-hover:scale-110" />}
                        className="relative hover:scale-5 w-full sm:w-auto bg-[#0a0a0a] text-white px-8 sm:px-16 py-5 sm:py-7 rounded-full text-lg sm:text-xl font-bold transition-all duration-300 hover:scale-105 group"
                    />
                </motion.div>
            </Section>
        </div>
    );
};

export default MainPage;