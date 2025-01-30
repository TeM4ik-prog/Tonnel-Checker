import { Routes, RoutesConfig } from "@/types/pagesConfig";
import { NavLink } from "react-router-dom";

interface Props {
    text: string;
    FC?: () => void;
    routeKey?: keyof Routes;
    color?: "red" | "blue";
    widthMin?: boolean;
    
}

export const Button = ({ text, FC, routeKey, widthMin = false, color = "blue" }: Props) => {
    const buttonColor = color === "red" ? "bg-red-500" : "bg-blue-500 ";
    const buttonWidth = widthMin ? "w-full" : "w-min";

    let path = '';

    if (routeKey) {
        const { path: routePath } = RoutesConfig[routeKey];
        path = routePath
    }

    return (
        <NavLink to={path || ''}  className="w-full z-10">
            <button onClick={FC} className={`${buttonColor} ${buttonWidth}  text-nowrap transition hover:bg-opacity-75 text-white font-bold py-2 px-4 rounded`}>
                {text}
            </button>
        </NavLink>

    )



}