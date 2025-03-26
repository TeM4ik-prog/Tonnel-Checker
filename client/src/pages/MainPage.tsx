import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { FaCrown, FaGift, FaStar, FaTelegram, FaUsers } from "react-icons/fa";

const MainPage: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 700 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            mouseX.set(e.clientX - rect.left);
            mouseY.set(e.clientY - rect.top);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <div ref={containerRef} className="min-h-screen z-0 bg-gradient-to-b from-gray-900 to-black text-white overflow-hidden">
            {/* Animated Background */}
            <motion.div
                className="fixed inset-0 z-0"
                style={{
                    background: "radial-gradient(circle at var(--x) var(--y), rgba(255,215,0,0.1) 0%, transparent 50%)",
                    x: springX,
                    y: springY,
                }}
            />

            {/* Hero Section */}
            <Section className="relative overflow-hidden">
                {/* Animated Background Pattern */}
                <motion.div
                    className="absolute inset-0 bg-[url('/luxury-pattern.png')] opacity-10"
                    animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 1, 0],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />

                {/* Main Content */}
                <motion.div
                    className="relative z-10 text-center px-4 w-full max-w-6xl mx-auto"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                >
                    <motion.div
                        className="relative inline-block mb-8 sm:mb-12"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                        <motion.div
                            className="absolute -inset-4 sm:-inset-8 bg-gradient-to-r from-yellow-400/20 via-yellow-200/20 to-yellow-400/20 rounded-full blur-2xl sm:blur-3xl"
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.5, 0.8, 0.5],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                        <motion.h1
                            className="p-5 text-5xl sm:text-7xl md:text-9xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400 text-transparent bg-clip-text relative"
                            animate={{
                                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                            }}
                            transition={{
                                duration: 5,
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
                        transition={{ delay: 0.8 }}
                    >
                        Розыгрыши на звёзды и деньги для избранных
                    </motion.p>

                    <motion.div
                        className="relative inline-block w-full sm:w-auto"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                        <Button
                            text="Присоединиться к розыгрышу"
                            href="https://t.me/perehodweba"
                            openNewPage={true}
                            icon={<FaTelegram className="text-xl sm:text-2xl" />}
                            className="w-full sm:w-auto bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-6 sm:px-12 py-4 sm:py-6 rounded-full text-lg sm:text-xl font-semibold hover:shadow-lg hover:shadow-yellow-500/30"
                        />
                        
                    </motion.div>
                </motion.div>

                {/* Floating Elements */}
                <motion.div
                    className="absolute inset-0 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    {[...Array(10)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-4 h-4 sm:w-6 sm:h-6 bg-yellow-400/30 rounded-full"
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
                                duration: 5 + Math.random() * 5,
                                repeat: Infinity,
                                ease: "linear",
                                delay: Math.random() * 2,
                            }}
                        />
                    ))}
                </motion.div>
            </Section>

            {/* Features Section */}
            <section className="py-16 sm:py-24 md:py-32 px-4 relative">
                <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-yellow-400/5 to-transparent"
                    style={{ y, opacity }}
                />
                <div className="max-w-7xl mx-auto relative">
                    <motion.h2
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-12 sm:mb-16 md:mb-20 text-yellow-400"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        Почему мы особенные
                    </motion.h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
                        {[
                            {
                                icon: <FaGift className="text-4xl sm:text-5xl text-yellow-400" />,
                                title: "Крупные призы",
                                description: "Розыгрыши на звёзды и деньги для активных участников",
                                color: "from-yellow-400/20 to-yellow-600/20"
                            },
                            {
                                icon: <FaUsers className="text-4xl sm:text-5xl text-yellow-400" />,
                                title: "Закрытое сообщество",
                                description: "Эксклюзивные розыгрыши только для подписчиков",
                                color: "from-yellow-400/20 to-yellow-600/20"
                            }
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                className="relative group"
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                                <motion.div
                                    className="absolute -inset-1 bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-1000"
                                    animate={{
                                        scale: [1, 1.1, 1],
                                        opacity: [0.5, 0.8, 0.5],
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                />
                                <div className="relative bg-gray-800/50 p-6 sm:p-8 md:p-12 rounded-2xl backdrop-blur-sm border border-yellow-400/20">
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
            <section className="py-16 sm:py-24 md:py-32 px-4 bg-gray-800/30 relative">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12 text-center"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                    >
                        {[
                            { number: "800+", label: "Подписчиков", icon: <FaUsers /> },
                            { number: "50+", label: "Розыгрышей", icon: <FaGift /> },
                            { number: "50K+", label: "Звёзд", icon: <FaStar /> }
                        ].map((stat, index) => (
                            <motion.div
                                key={index}
                                className="relative group"
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                                <motion.div
                                    className="absolute -inset-1 bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-1000"
                                />
                                <div className="relative p-6 sm:p-8 bg-gray-800/50 rounded-xl border border-yellow-400/20">
                                    <motion.div
                                        className="text-4xl sm:text-5xl font-bold text-yellow-400 mb-2 sm:mb-4"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.2 }}
                                    >
                                        {stat.number}
                                    </motion.div>
                                    <div className="text-base sm:text-xl text-gray-400">{stat.label}</div>
                                    <div className="absolute top-4 sm:top-6 right-4 sm:right-6 text-yellow-400/30 text-xl sm:text-2xl">
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
                        transition={{ duration: 0.8 }}
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
                                className="w-full sm:w-auto bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-6 sm:px-12 py-4 sm:py-6 rounded-full text-lg sm:text-xl font-semibold hover:shadow-lg hover:shadow-yellow-500/30"
                            />
                            
                        </motion.div>
                    
                </div>
            </section>

            {/* Creator Section */}
            <section className="py-8 sm:py-12 md:py-16 px-4 relative">
                <div className="max-w-7xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex items-center justify-center gap-3 sm:gap-4"
                    >

                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default MainPage;