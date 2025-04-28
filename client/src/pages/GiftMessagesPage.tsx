import { PageContainer } from "@/components/layout/PageContainer"
import { Gift } from "@/components/shared/gift/gift"
import { Button } from "@/components/ui/Button"
import { GiftService } from "@/services/gift.service"
import { UserService } from "@/services/user.service"
import { onRequest } from "@/types"
import { IUserFilters } from "@/types/gift"
import { IGiftMessage } from "@/types/message"
import { useEffect, useState } from "react"

interface IGiftMessagesData {
    displayed: IGiftMessage[]
    hidden: IGiftMessage[]
}

export const GiftMessagesPage: React.FC = () => {
    const [giftMessages, setGiftMessages] = useState<IGiftMessagesData>()
    const [filters, setFilters] = useState<IUserFilters[]>([])

    const getUserMessages = async () => {
        const data: IGiftMessagesData = await onRequest(UserService.getUserGiftMessages())
        const filtersData: IUserFilters[] = await onRequest(GiftService.getUserFilters())
        
        if (data && filtersData) {
            setGiftMessages(data)
            setFilters(filtersData)
        }
    }

    const restoreGift = async (messageId: number, chatId: number) => {
        const data = await onRequest(GiftService.restoreUserGiftMessage(messageId, chatId))
        if (data) {
            await getUserMessages()
        }
    }

    useEffect(() => {
        getUserMessages()
    }, [])

    const getItemFilters = (giftName: string): IUserFilters => {
        return filters.find(filter => filter.nft === giftName) || {
            nft: giftName,
            models: [],
            backgrounds: [],
            symbols: []
        }
    }

    return (
        <PageContainer title="Скрытые подарки" className="!p-1">
            <div className="flex flex-col w-full space-y-4">
                {giftMessages?.hidden.map((message) => (
                    <div key={message.id} className="bg-gray-100 dark:bg-gray-900 rounded w-full p-2">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                                {message.Gift.name}
                            </h3>

                            <Button
                                text="Восстановить"
                                FC={() => restoreGift(message.messageId, message.chatId)}
                                color="blue"
                                className="ml-4"
                            />
                        </div>
                        <Gift 
                            gift={message.Gift} 
                            itemFilters={getItemFilters(message.Gift.name)} 
                        />
                    </div>
                ))}
            </div>
        </PageContainer>
    )
}