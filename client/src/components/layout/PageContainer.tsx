import { ReactNode } from "react";
import { motion } from "framer-motion"

interface Props {
    title?: string;
    children: ReactNode
}

export const PageContainer = ({ title, children }: Props) => {

    return (
        // <div className="flex flex-col gap-5 justify-center items-center">

        <motion.section
            key={title}
            className="flex flex-col gap-5 justify-center items-center"

            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <h1 className="text-4xl font-bold text-green-400 my-3">{title || ''}</h1>
            {children}

        </motion.section>

        // </div>
    )



}