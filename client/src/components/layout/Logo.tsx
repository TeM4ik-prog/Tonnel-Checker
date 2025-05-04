import { Link } from "react-router-dom";
import { RoutesConfig } from "@/types/pagesConfig";
import logo from "@/assets/pepe-logo.png";
interface Props {
    className?: string;
}

export const Logo: React.FC<Props> = ({ className }) => {
    return (
        <div className={`flex items-center z-10 h-min mr-auto ${className}`}>
            <img src={logo} alt="logo" className="w-20 h-20" />
            <Link to={RoutesConfig.HOME.path}>
                <span className="font-['Pacifico',cursive] p-1 text-nowrap text-4xl bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 text-transparent bg-clip-text">
                    Tonnel Checker
                </span>
            </Link>
        </div>
    )
}

