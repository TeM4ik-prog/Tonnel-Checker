import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
    title?: string;
    children: ReactNode,
    className?: string
}

export const PageContainer = ({ title, children, className }: Props) => {
    return (
        <motion.section
            key={title}
            className={`flex flex-col w-full h-full px-4 pt-3 pb-12 relative z-0 backdrop-blur-sm ${className}`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            <div className="flex-1 w-full mx-auto flex flex-col items-center h-full">
                {title && (
                    <h1 className="text-3xl md:text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 m-6">
                        {title}
                    </h1>
                )}
                <div className="w-full h-full flex-1 flex justify-center">
                    {children}
                </div>
            </div>
        </motion.section>
    )
}