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
            className={`flex flex-1 flex-col w-full h-full px-1 md:px-4 z-0 justify-center ${className}`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex flex-1 flex-col w-full gap-4 p-1 mb-5">
                {title && (
                    <h1 className="text-3xl md:text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 m-6">
                        {title}
                    </h1>
                )}

                {children}
            </div>
        </motion.section>
    )
}