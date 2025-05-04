import { Block } from "@/components/layout/Block";
import { PageContainer } from "@/components/layout/PageContainer";
import { GiftDataUpdate, GiftDataUpdateList } from "@/components/shared/gift/giftGroupInfo";
import { GiftService } from "@/services/gift.service";
import { useUserData } from "@/store/hooks";
import { onRequest } from "@/types";
import { GroupedUpdates, IGift, IGiftDataUpdate, IUserFilters } from "@/types/gift";
import { groupGiftUpdates } from "@/utils/gifts";
import { BanIcon, CheckCircle, Filter } from "lucide-react";
import { useEffect, useState } from "react";



interface ILastUpdate {
    id: string;
    GiftsDataUpdate: IGiftDataUpdate[];
    updatedAt: string;

}

const MainPage: React.FC = () => {
    const [lastUpdate, setLastUpdate] = useState<ILastUpdate | null>(null);
    const [groupedUpdates, setGroupedUpdates] = useState<GroupedUpdates>({});
    const { user } = useUserData();

    const updateData = async () => {
        const data: { lastUpdate: ILastUpdate, filters: IUserFilters[] } = await onRequest(GiftService.getLastUpdate());
        console.log(data.lastUpdate.GiftsDataUpdate);

        if (data) {
            setLastUpdate(data.lastUpdate);
            setGroupedUpdates(groupGiftUpdates(data.lastUpdate.GiftsDataUpdate, data.filters));
        }
    };

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
        updateData();
    }, []);

    return (
        <PageContainer className="">
            {user?.hasAccess ? (
                <div className="m-2 p-4 bg-green-900/20 border-l-4 border-green-500 rounded-lg backdrop-blur-sm">
                    <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                        <p className="text-green-100 font-medium">
                            У вас есть права администратора
                        </p>
                    </div>
                    <p className="mt-2 text-sm text-green-300/90">
                        Полный доступ к управлению пользователями и фильтрами
                    </p>
                </div>
            ) : (
                <div className="m-2 p-4 bg-red-900/20 border-l-4 border-red-500 rounded-lg backdrop-blur-sm">
                    <div className="flex items-center">
                        <BanIcon className="h-5 w-5 text-red-400 mr-2" />
                        <p className="text-red-100 font-medium">
                            Доступ ограничен
                        </p>
                    </div>
                    <p className="mt-2 text-sm text-red-300/90">
                        Требуются административные привилегии
                    </p>
                </div>
            )}

            <div className="mb-3">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    Последнее обновление: {lastUpdate?.updatedAt ? new Date(lastUpdate.updatedAt).toLocaleString('ru-RU', { hour: '2-digit', minute: '2-digit' }) : 'Нет данных'}
                    <span className="ml-2 text-gray-500">(обновление раз в минуту)</span>
                </p>
            </div>

            <GiftDataUpdateList groupedUpdates={groupedUpdates} toggleGroup={toggleGroup} />
        </PageContainer>
    );
};

export default MainPage;