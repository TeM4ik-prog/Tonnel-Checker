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
            className={`flex flex-col min-h-screen w-full pt-3 pb-12 relative z-0 ${className}`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            <div className="flex-1 w-full max-w-7xl mx-auto px-4 flex flex-col items-center">
                {title && (
                    <h1 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-12">
                        {title}
                    </h1>
                )}
                <div className="w-full flex justify-center">
                    {children}
                </div>
            </div>
        </motion.section>
    )
}