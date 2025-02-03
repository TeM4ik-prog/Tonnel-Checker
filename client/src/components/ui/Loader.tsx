import { motion } from "framer-motion";

export const Loader = () => {
    return (
        <div className="flex relative justify-center items-center w-full">
            {/* <div className="w-full h-full bg-black opacity-50"></div> */}
            <motion.div
                className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            />
        </div>
    );
};
