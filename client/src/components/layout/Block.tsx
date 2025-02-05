import { ReactNode } from "react"

interface Props {
    children: ReactNode,
    className?: string
    lighter?: boolean
}


export const Block = ({ children, className, lighter }: Props) => {

    const bgColor = lighter ? 'bg-gray-500 p-2 my-2' : 'bg-gray-700'



    return (
        <div className={`${bgColor} relative shadow-lg rounded-lg overflow-hidden w-full ${className}`}>
            {children}
        </div>
    )
}