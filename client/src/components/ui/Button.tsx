import { RouteKey, Routes, RoutesConfig } from "@/types/pagesConfig";
import { NavLink } from "react-router-dom";

interface Props {
    text: string;
    FC?: () => void;
    routeKey?: RouteKey;
    color?: "red" | "blue";
    widthMin?: boolean;

    href?: string;

    formSubmit?: boolean



}

export const Button = ({ text, FC, routeKey, widthMin = false, href, formSubmit = false, color = "blue" }: Props) => {
    const buttonColor = color === "red" ? "bg-red-500" : "bg-blue-500 "
    const buttonWidth = widthMin ? "w-full" : "w-min"

    const path = routeKey && RoutesConfig[routeKey]?.path ? RoutesConfig[routeKey].path : null

    const renderButton = () => {
        return (
            <button onClick={FC} className={`${buttonColor} ${buttonWidth}  text-nowrap transition hover:bg-opacity-75 text-white font-bold py-2 px-4 rounded`}>
                {text}
            </button>
        )
    }

    return (
        <>
            {!formSubmit ? (
                <NavLink to={path || href || ''} target={href ? "_blank" : ''} className="w-full z-10">
                    {renderButton()}
                </NavLink>

            ) : (
                renderButton()
            )}
        </>

    )



}