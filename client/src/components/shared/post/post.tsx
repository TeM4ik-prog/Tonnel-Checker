import React from "react";
import { NavLink } from "react-router-dom";

export interface PostProps {
    title: string;
    date: string;
    source: string;
    link: string;
    content: string;
}

export const Post = ({ title, date, source, link, content }: PostProps) => {
    return (
        <div className="bg-gray-700 shadow-lg rounded-lg p-6 w-full md:w-2/3 lg:w-1/2">
            <h2 className="text-2xl font-bold text-gray-100">{title}</h2>
            <p className="text-sm text-gray-400">{date} | {source}</p>
            <p className="mt-4 text-gray-100">{content}</p>
            <NavLink to={link} target="_blank" className="mt-4 inline-block text-blue-500 underline">
                Читать далее
            </NavLink>
        </div>
    );
};