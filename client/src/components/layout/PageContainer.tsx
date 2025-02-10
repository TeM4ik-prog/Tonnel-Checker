import { ReactNode } from "react";
import { motion } from "framer-motion"

interface Props {
    title?: string;
    children: ReactNode,
    className?: string
}

export const PageContainer = ({ title, children, className }: Props) => {

    return (
        // <div className="flex flex-col gap-5 justify-center items-center">

        <motion.section
            key={title}
            className={`${className} flex flex-col min-h-screen w-full gap-5 justify-start items-center`}

            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <h1 className="text-4xl font-bold text-center text-green-400 my-3">{title || ''}</h1>
            {children}

        </motion.section>

        // </div>
    )



}