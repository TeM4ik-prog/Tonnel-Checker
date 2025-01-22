import { Home, Search, User } from "lucide-react"

export const Footer: React.FC = () => {

    return (
        <footer className="bg-gray-900 mt-auto text-gray-100 p-4">
            <div className="flex justify-between">
                <Home size={24} color="white" />
                <Search size={32} className="text-gray-500" />
                <User size={28} />
            </div>
        </footer>
    )
}