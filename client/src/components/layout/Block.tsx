import { ReactNode } from "react"

interface Props {
    children: ReactNode,
    className?: string
}


export const Block = ({ children, className }: Props) => {



    return (
        <div className={`bg-gray-700 relative shadow-lg rounded-lg overflow-hidden w-full md:w-2/3 lg:w-1/2 mx-auto mb-8 ${className}`}>
            {children}
        </div>
    )
}