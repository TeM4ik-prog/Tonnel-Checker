// import { Switch } from "@/components/ui/switch"
import { UserRoles } from "@/types"
import { IUser } from "@/types/auth"
import { Switch } from "@headlessui/react"
import { useState } from "react"



interface UserProps {
    user: IUser
    isAdmin: boolean
    onToggleRights?: (telegramId: number) => void
}

export const User: React.FC<UserProps> = ({ user, isAdmin, onToggleRights }) => {
    const [hasRights, setHasRights] = useState(user.hasRights)

    const handleToggleRights = () => {
        if (onToggleRights) {
            setHasRights(!hasRights)
            onToggleRights(user.telegramId)
        }
    }

    return (
        <tr className="hover:bg-gray-700/50 transition-colors h-12">
            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                <div className="flex items-center gap-2">
                    <span className="text-gray-200 font-medium">
                        {user.firstName} {user.lastName || ''}
                    </span>
                    {isAdmin && (
                        <span className="text-xs text-green-400 bg-green-900/30 px-2 py-0.5 rounded-full">
                            Вы
                        </span>
                    )}
                </div>
            </td>
            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                {user.username}
            </td>
            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                {user.telegramId}
            </td>
            <td className="px-4 py-3 whitespace-nowrap">
                {onToggleRights && !isAdmin ? (
                    <div className="flex items-center gap-2">
                        <Switch
                            checked={hasRights}
                            onChange={handleToggleRights}
                            className={`${
                                hasRights ? 'bg-green-600' : 'bg-gray-700'
                            } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2`}
                        >
                            <span
                                className={`${
                                    hasRights ? 'translate-x-6' : 'translate-x-1'
                                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                            />
                        </Switch>
                        <span className={`text-xs font-semibold ${hasRights ? 'text-green-300' : 'text-red-300'}`}>
                            {hasRights ? 'Есть права' : 'Нет прав'}
                        </span>
                    </div>
                ) : (
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${hasRights
                        ? 'bg-green-900 text-green-300'
                        : 'bg-red-900 text-red-300'
                        }`}>
                        {hasRights ? 'Есть права' : 'Нет прав'}
                    </span>
                )}
            </td>
            <td className="px-4 py-3 whitespace-nowrap">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${user.role === UserRoles.Admin
                    ? 'bg-green-900 text-green-300'
                    : 'bg-red-900 text-red-300'
                    }`}>
                    {user.role}
                </span>
            </td>
        </tr>
    )
}
