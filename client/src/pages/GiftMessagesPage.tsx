import { PageContainer } from "@/components/layout/PageContainer"
import { GiftDataUpdateList } from "@/components/shared/gift/giftGroupInfo"
import { FiltersService } from "@/services/filters.service"
import { GiftService } from "@/services/gift.service"
import { UserService } from "@/services/user.service"
import { onRequest } from "@/types"
import { GroupedUpdates, IGiftDataUpdate, IUserFilters } from "@/types/gift"
import { IGiftMessage } from "@/types/message"
import { groupGiftUpdates } from "@/utils/gifts"
import { useEffect, useState } from "react"




interface IGiftMessagesData {
    displayed: IGiftMessage[]
    hidden: IGiftDataUpdate[]
}

export const GiftMessagesPage: React.FC = () => {
    const [groupedUpdates, setGroupedUpdates] = useState<GroupedUpdates>({});

    const getUserMessages = async () => {
        const messages: IGiftMessagesData = await onRequest(UserService.getUserGiftMessages())
        const filters: IUserFilters[] = await onRequest(FiltersService.getUserFilters())
        console.log(messages, filters)

        console.log(groupGiftUpdates(messages.hidden, filters))

        if (messages && filters) {
            setGroupedUpdates(groupGiftUpdates(messages.hidden, filters));
        }


    }

    const toggleGroup = (name: string) => {
        setGroupedUpdates(prev => ({
            ...prev,
            [name]: {
                ...prev[name],
                isExpanded: !prev[name].isExpanded
            }
        }));
    };

    useEffect(() => {
        getUserMessages()
    }, [])


    return (
        <PageContainer title="Скрытые подарки" className="!p-1 w-full">
            <GiftDataUpdateList groupedUpdates={groupedUpdates} toggleGroup={toggleGroup} />
        </PageContainer>
    )
}