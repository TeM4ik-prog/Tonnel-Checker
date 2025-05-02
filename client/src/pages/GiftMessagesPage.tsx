import { PageContainer } from "@/components/layout/PageContainer"
import { GiftDataUpdateList } from "@/components/shared/gift/giftGroupInfo"
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
        const data: IGiftMessagesData = await onRequest(UserService.getUserGiftMessages())
        const filtersData: IUserFilters[] = await onRequest(GiftService.getUserFilters())
        console.log(data, filtersData)

        console.log(groupGiftUpdates(data.hidden, filtersData))

        if (data && filtersData) {
            setGroupedUpdates(groupGiftUpdates(data.hidden, filtersData));
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