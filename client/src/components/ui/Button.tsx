import { RouteKey, Routes, RoutesConfig } from "@/types/pagesConfig";
import { ReactNode } from "react";
import { NavLink } from "react-router-dom";



interface Props {
    text: string;
    FC?: () => void;
    routeKey?: string;
    color?: "red" | "blue";
    widthMin?: boolean;
    openNewPage?: boolean;

    href?: string;

    formSubmit?: boolean
    disabled?: boolean
    className?: string;

    icon?:  ReactNode



}

export const Button = ({ text, FC, routeKey, icon, widthMin = false, href, className, openNewPage = false, disabled = false, formSubmit = false, color = "blue" }: Props) => {
    const buttonColor = color === "red" ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"
    const buttonWidth = widthMin ? "w-full" : "w-min"


    const path = routeKey && RoutesConfig[routeKey]?.path ? RoutesConfig[routeKey].path : null

    const renderButton = () => {
        return (
            <button
                onClick={FC} className={`${buttonColor} ${buttonWidth} ${className} flex flex-row items-center text-nowrap transition font-bold text-white gap-1  py-2 px-4 rounded`}
                disabled={disabled}
            >
                {icon}
                {text}
            </button>
        )
    }

    console.log(href, openNewPage)

    return (
        <>
            {!formSubmit ? (
                <NavLink to={path || href || ''} target={openNewPage ? "_blank" : ''} className="flex justify-center z-10">
                    {renderButton()}
                </NavLink>

            ) : (
                renderButton()
            )}
        </>

    )



}