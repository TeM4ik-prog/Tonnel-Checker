import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { motion } from "framer-motion";

const NotFoundPage = () => {
    return (
        <Section>
            <div className="min-h-[80vh] flex items-center justify-center">
                <motion.div 
                    className="text-center max-w-2xl mx-auto p-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <motion.h1 
                        className="text-9xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
                        animate={{ 
                            scale: [1, 1.1, 1],
                            rotate: [0, -5, 5, 0]
                        }}
                        transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            repeatType: "reverse"
                        }}
                    >
                        404
                    </motion.h1>
                    <motion.p 
                        className="text-3xl font-semibold mb-6 text-gray-800"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        Страница не найдена
                    </motion.p>
                    <motion.p 
                        className="text-xl mb-12 text-gray-600"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        Извините, но страница, которую вы ищете, не существует или была перемещена.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                    >
                        <Button 
                            text="Вернуться на главную" 
                            routeKey="HOME"
                            className="px-8 py-4 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105"
                        />
                    </motion.div>
                </motion.div>
            </div>
        </Section>
    );
};

export default NotFoundPage;
