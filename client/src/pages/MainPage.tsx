import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FaCrown, FaGift, FaStar, FaTelegram, FaUsers } from "react-icons/fa";

const MainPage: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, -30]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <div ref={containerRef} className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white overflow-hidden">
            {/* Hero Section */}
            <Section className="relative overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-black">
                    {/* Animated Gradient Orbs */}
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
                    <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-2000" />
                    
                    {/* Grid Pattern */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
                </div>

                {/* Floating Elements */}
                <motion.div
                    className="absolute inset-0 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    {[...Array(5)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-3 h-3 sm:w-4 sm:h-4 bg-yellow-400/20 rounded-full"
                            initial={{
                                x: Math.random() * window.innerWidth,
                                y: Math.random() * window.innerHeight,
                                scale: 0,
                            }}
                            animate={{
                                x: Math.random() * window.innerWidth,
                                y: Math.random() * window.innerHeight,
                                scale: [0, 1, 0],
                            }}
                            transition={{
                                duration: 8 + Math.random() * 4,
                                repeat: Infinity,
                                ease: "linear",
                                delay: Math.random() * 2,
                            }}
                        />
                    ))}
                </motion.div>

                {/* Main Content */}
                <motion.div
                    className="relative z-10 text-center px-4 w-full max-w-6xl mx-auto"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                >
                    <motion.div
                        className="relative inline-block mb-8 sm:mb-12"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                    >
                        <motion.h1
                            className="p-5 text-5xl sm:text-7xl md:text-9xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400 text-transparent bg-clip-text relative"
                            animate={{
                                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                            }}
                            transition={{
                                duration: 8,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        >
                            Webky
                        </motion.h1>
                    </motion.div>

                    <motion.p
                        className="text-xl sm:text-2xl md:text-3xl text-gray-300 mb-8 sm:mb-12 font-light px-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                    >
                        Розыгрыши на звёзды и деньги для избранных
                    </motion.p>

                    <motion.div
                        className="relative inline-block w-full sm:w-auto"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Button
                            text="Присоединиться к розыгрышу"
                            href="https://t.me/perehodweba"
                            openNewPage={true}
                            icon={<FaTelegram className="text-xl sm:text-2xl transition-transform group-hover:scale-110" />}
                            className="w-full sm:w-auto bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 text-black px-8 sm:px-16 py-5 sm:py-7 rounded-full text-lg sm:text-xl font-bold hover:shadow-[0_0_30px_rgba(234,179,8,0.5)] transition-all duration-300 hover:scale-105 group"
                        />
                    </motion.div>
                </motion.div>
            </Section>

            {/* Features Section */}
            <section className="py-16 sm:py-24 md:py-32 px-4 relative">
                <div className="max-w-7xl mx-auto relative">
                    <motion.h2
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-12 sm:mb-16 md:mb-20 text-yellow-400"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        transition={{ 
                            duration: 0.6,
                            ease: "easeOut"
                        }}
                    >
                        Почему мы особенные
                    </motion.h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
                        {[
                            {
                                icon: <FaGift className="text-4xl sm:text-5xl text-yellow-400" />,
                                title: "Крупные призы",
                                description: "Розыгрыши на звёзды и деньги для активных участников",
                                color: "from-yellow-400/20 to-yellow-600/20",
                                initialX: -30
                            },
                            {
                                icon: <FaUsers className="text-4xl sm:text-5xl text-yellow-400" />,
                                title: "Закрытое сообщество",
                                description: "Эксклюзивные розыгрыши только для подписчиков",
                                color: "from-yellow-400/20 to-yellow-600/20",
                                initialX: 30
                            }
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                className="relative group"
                                initial={{ opacity: 0, x: feature.initialX }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: false, margin: "-50px" }}
                                whileHover={{ scale: 1.01 }}
                                transition={{ 
                                    duration: 0.4,
                                    ease: "easeOut",
                                    hover: {
                                        duration: 0.2,
                                        ease: "easeInOut"
                                    }
                                }}
                            >
                                <div className="relative bg-gray-800/50 p-6 sm:p-8 md:p-12 rounded-2xl backdrop-blur-sm border border-yellow-400/10">
                                    <div className="mb-4 sm:mb-6">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-4">{feature.title}</h3>
                                    <p className="text-base sm:text-lg text-gray-400">{feature.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 sm:py-24 md:py-32 px-4 bg-gray-800/20 relative">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12 text-center"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.6 }}
                    >
                        {[
                            { number: "800+", label: "Подписчиков", icon: <FaUsers /> },
                            { number: "50+", label: "Розыгрышей", icon: <FaGift /> },
                            { number: "50K+", label: "Звёзд", icon: <FaStar /> }
                        ].map((stat, index) => (
                            <motion.div
                                key={index}
                                className="relative group"
                                whileHover={{ scale: 1.01 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="relative p-6 sm:p-8 bg-gray-800/50 rounded-xl border border-yellow-400/10">
                                    <motion.div
                                        className="text-4xl sm:text-5xl font-bold text-yellow-400 mb-2 sm:mb-4"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: false }}
                                        transition={{ delay: index * 0.1, duration: 0.4 }}
                                    >
                                        {stat.number}
                                    </motion.div>
                                    <div className="text-base sm:text-xl text-gray-400">{stat.label}</div>
                                    <div className="absolute top-4 sm:top-6 right-4 sm:right-6 text-yellow-400/20 text-xl sm:text-2xl">
                                        {stat.icon}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 sm:py-24 md:py-32 px-4 relative">
                <div className="max-w-5xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="relative inline-block mb-6 sm:mb-8">
                            <FaCrown className="text-5xl sm:text-6xl md:text-7xl text-yellow-400" />
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 md:mb-8">Готовы к подаркам?</h2>
                        <p className="text-lg sm:text-xl md:text-2xl text-gray-400 mb-8 sm:mb-10 md:mb-12 px-4">
                            Присоединяйтесь к нашему сообществу и участвуйте в эксклюзивных розыгрышах
                        </p>
                        <Button
                            text="Начать участвовать"
                            href="https://t.me/perehodweba"
                            openNewPage={true}
                            icon={<FaTelegram className="text-xl sm:text-2xl" />}
                            className="w-full sm:w-auto bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-6 sm:px-12 py-4 sm:py-6 rounded-full text-lg sm:text-xl font-semibold hover:shadow-lg hover:shadow-yellow-500/20"
                        />
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default MainPage;