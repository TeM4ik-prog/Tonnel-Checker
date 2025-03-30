import { Link } from "react-router-dom";
import { RoutesConfig } from "@/types/pagesConfig";

interface Props {
    className?: string;
}

export const Logo: React.FC<Props> = ({ className }) => {
    return (
        <div className={`flex items-center z-10 h-min mr-auto ${className}`}>
            <Link to={RoutesConfig.HOME.path}>
                <span className="font-['Pacifico',cursive] p-2 text-nowrap text-4xl bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 text-transparent bg-clip-text">
                    Dark Project
                </span>
            </Link>
        </div>
    )
}

