import { RouteKey, Routes, RoutesConfig } from "@/types/pagesConfig";
import { ReactNode } from "react";
import { NavLink } from "react-router-dom";



interface Props {
    text: string;
    FC?: () => void;
    routeKey?: string;
    color?: "red" | "blue" | "green";
    widthMin?: boolean;
    openNewPage?: boolean;

    href?: string;

    formSubmit?: boolean
    disabled?: boolean
    className?: string;

    icon?: ReactNode



}

export const Button = ({ text, FC, routeKey, icon, widthMin = false, href, className, openNewPage = false, disabled = false, formSubmit = false, color = "blue" }: Props) => {
    const buttonColor = color === "red"
        ? "bg-red-500 active:bg-red-600 md:hover:bg-red-600"
            : color === "green"
            ? "bg-green-500 active:bg-green-600 md:hover:bg-green-600"
            : "bg-blue-500 active:bg-blue-600 md:hover:bg-blue-600";
    const buttonWidth = !widthMin ? "w-full flex-1" : "w-min"


    const path = routeKey && RoutesConfig[routeKey]?.path ? RoutesConfig[routeKey].path : null

    const renderButton = () => {
        return (
            <button

                onClick={FC} className={`
                     ${buttonWidth} 
                     ${disabled ? "bg-gray-400 cursor-not-allowed" : buttonColor} 
                     ${className} flex flex-row justify-center items-center text-nowrap transition font-bold text-white gap-3 py-2 px-4 rounded`}
                disabled={disabled}
            >
                {icon}
                {text}
            </button>
        )
    }

    return (
        <>
            {!formSubmit ? (
                <NavLink to={path || href || ''} target={openNewPage ? "_blank" : ''} className="flex z-10">
                    {renderButton()}
                </NavLink>
            ) : (
                renderButton()
            )}
        </>
    )
}