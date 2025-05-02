import { GroupedUpdates, IGiftDataUpdate, IUserFilters } from "@/types/gift"
import { ArchiveRestoreIcon, Filter } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { GiftsList } from "./gift";
import { Block } from "@/components/layout/Block";
import { getProfitColor } from "@/utils/gifts";
import { useContext } from "react";
import { RestoreGiftUpdateContext } from "@/App";
import { onRequest } from "@/types";
import { GiftService } from "@/services/gift.service";
import { toast } from "react-toastify";

interface GiftDataUpdateProps {
    group: {
        items: IGiftDataUpdate[];
        itemFilters: IUserFilters;
        isExpanded: boolean;
    },
    toggleGroup: (name: string) => void;
    name: string
}

interface GiftDataProps {
    update: IGiftDataUpdate;
    itemFilters: IUserFilters;
}

interface GiftDataListProps {
    group: {
        items: IGiftDataUpdate[];
        itemFilters: IUserFilters;
        isExpanded: boolean;
    };
}

interface GroupedUpdatesProps {
    groupedUpdates: GroupedUpdates;
    toggleGroup: (name: string) => void;
}






export const GiftDataUpdateList: React.FC<GroupedUpdatesProps> = ({ groupedUpdates, toggleGroup }) => {
    return (
        <>
            {Object.keys(groupedUpdates).length > 0 && (

                <div className="space-y-3 w-full">
                    {Object.entries(groupedUpdates).map(([name, group]) => (
                        <GiftDataUpdate key={name} group={group} name={name} toggleGroup={toggleGroup} />
                    ))}
                </div>

            )}
        </>
    )
}

export const GiftDataUpdate: React.FC<GiftDataUpdateProps> = ({ group, name, toggleGroup }) => {
    return (
        <Block key={name} className="p-1">
            <div
                className="cursor-pointer"
                onClick={() => toggleGroup(name)}>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">

                    <div className="flex-1">
                        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                            {name}
                            <span className="ml-2 text-sm text-gray-500">
                                ({group.items.length} {group.items.length === 1 ? 'элемент' : group.items.length < 5 ? 'элемента' : 'элементов'})
                            </span>
                        </h2>

                        <div className="space-y-2">
                            {group.itemFilters && (
                                <div className="space-y-1">
                                    {group.itemFilters.models?.length > 0 && (
                                        <div className="flex items-start gap-1">
                                            <p className="text-xs text-gray-500">Модели:</p>
                                            <p className="text-xs font-medium line-clamp-1">
                                                {group.itemFilters.models.join(', ')}
                                            </p>
                                        </div>
                                    )}

                                    {group.itemFilters.backgrounds?.length > 0 && (
                                        <div className="flex items-start gap-1">
                                            <p className="text-xs text-gray-500">Фоны:</p>
                                            <p className="text-xs font-medium line-clamp-1">
                                                {group.itemFilters.backgrounds.join(', ')}
                                            </p>
                                        </div>
                                    )}

                                    {group.itemFilters.symbols?.length > 0 && (
                                        <div className="flex items-start gap-1">
                                            <p className="text-xs text-gray-500">Символы:</p>
                                            <p className="text-xs font-medium line-clamp-1">
                                                {group.itemFilters.symbols.join(', ')}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                            {group.isExpanded ? 'Скрыть' : 'Показать'}
                        </span>
                        <svg
                            className={`w-4 h-4 transition-transform ${group.isExpanded ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
            </div>

            {group.isExpanded && (
                <GiftDataList group={group} />
            )}
        </Block>
    )
}


export const GiftDataList: React.FC<GiftDataListProps> = ({ group }) => {
    return (
        <div className="flex flex-col gap-2">
            {group.items.map((update: IGiftDataUpdate) => (
                <GiftData key={update.id} update={update} itemFilters={group.itemFilters} />
            ))}
        </div>
    )
}

export const GiftData: React.FC<GiftDataProps> = ({ update, itemFilters }) => {
    const restoreGiftUpdate = useContext(RestoreGiftUpdateContext);

    const restoreGift = async (messageId: number | undefined, chatId: number | undefined) => {
        if (!messageId || !chatId) return
        const data = await onRequest(GiftService.restoreUserGiftMessage(messageId, chatId))

        console.log(data)
        if (data) {
            console.log('success')

            toast.success('Подарок восстановлен')
            window.location.reload()
            // await getUserMessages()
        }
    }



    return (
        <div key={update.id} className="bg-gray-100 dark:bg-gray-800 rounded p-1">
            <div className="flex flex-col md:flex-col gap-2">
                <div className="flex flex-row md:flex-col justify-between gap-2">
                    <div className="flex-1">
                        <div className="flex items-center gap-3">
                            <span className={`text-lg font-bold ${getProfitColor(update.profit)}`}>
                                {update.profit} TON
                            </span>
                        </div>
                    </div>
                    <div className="">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Цена продажи: </span>
                        <span className="font-bold text-blue-600 dark:text-blue-400">
                            {update.sellPrice} TON
                        </span>
                    </div>
                </div>

                <div className="flex flex-row gap-2">
                    <Button
                        className="justify-start"
                        text="Перейти на этот фильтр"
                        href={update.tonnelLink}
                        icon={<Filter />}
                    />

                    {restoreGiftUpdate && (

                        <Button
                            className="justify-start"
                            text="Восстановить"
                            icon={<ArchiveRestoreIcon />}
                            FC={() => restoreGift(update.message?.messageId, update.message?.chatId)}
                        />
                    )}


                </div>



            </div>

            <GiftsList
                update={update}
                itemFilters={itemFilters}
            />

        </div>
    )
}