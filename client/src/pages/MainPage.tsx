import { Block } from "@/components/layout/Block";
import { PageContainer } from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/Button";
import { GiftService } from "@/services/gift.service";
import { onRequest } from "@/types";
import { IPackGiftsDataUpdate } from "@/types/gift";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

interface PriceData {
    default: any;
    black: any;
    onyx: any;
}

interface GiftPrice {
    name: string;
    firstBlackPrice: number;
    secondBlackPrice: number;
    profit: number;
    profitRub: number;
}

const gifts: string[] =
    ["Jack-in-the-Box", "Cookie Heart", "Evil Eye", "Ginger Cookie", "Tama Gadget", "Trapped Heart", "Jelly Bunny", "Homemade Cake"]

interface GroupedUpdates {
    [name: string]: {
        items: IPackGiftsDataUpdate[];
        isExpanded: boolean;
    };
}

const MainPage: React.FC = () => {
    const [lastUpdate, setLastUpdate] = useState<IPackGiftsDataUpdate | null>(null)
    const [groupedUpdates, setGroupedUpdates] = useState<GroupedUpdates>({});
    const [loading, setLoading] = useState(true);

    const location = useLocation();

    const updateData = async () => {
        setLoading(true);
        const data = await onRequest(GiftService.getLastUpdate())
        console.log(data.GiftsDataUpdate)
        if (data) {
            setLastUpdate(data);
            groupUpdates(data.GiftsDataUpdate);
        }
        setLoading(false);
    };

    const groupUpdates = (updates: IPackGiftsDataUpdate[]) => {
        const grouped: GroupedUpdates = {};
        
        updates.forEach(update => {
            const name = update.Gifts[0]?.name || 'Unknown';
            
            if (!grouped[name]) {
                grouped[name] = {
                    items: [],
                    isExpanded: false
                };
            }
            
            grouped[name].items.push(update);
        });
        
        setGroupedUpdates(grouped);
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

    const getProfitColor = (profit: number) => {
        if (profit > 0) return 'text-green-500';
        if (profit < 0) return 'text-red-500';
        return 'text-gray-500';
    };

    const formatPrice = (price: number) => {
        return price.toFixed(2);
    };

    return (
        <PageContainer className="pt-0">
            <div className="w-full max-w-6xl mx-auto p-2">
                <div className="mb-3">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Последнее обновление: {lastUpdate?.updatedAt ? new Date(lastUpdate.updatedAt).toLocaleString() : 'Нет данных'}
                        <span className="ml-2 text-gray-500">(обновление раз в минуту)</span>
                    </p>
                </div>

                {Object.keys(groupedUpdates).length > 0 && (
                    <div className="space-y-3">
                        {Object.entries(groupedUpdates).map(([name, group]) => (
                            <Block key={name} className="p-3">
                                <div 
                                    className="cursor-pointer"
                                    onClick={() => toggleGroup(name)}
                                >
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                                        <div className="flex-1">
                                            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                                                {name}
                                                <span className="ml-2 text-sm text-gray-500">
                                                    ({group.items.length} {group.items.length === 1 ? 'элемент' : group.items.length < 5 ? 'элемента' : 'элементов'})
                                                </span>
                                            </h2>
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
                                    <div className="mt-3 space-y-3">
                                        {group.items.map((update) => (
                                            <div key={update.id} className="bg-gray-100 dark:bg-gray-800 rounded p-3">
                                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-3">
                                                            <span className={`text-lg font-bold ${getProfitColor(update.profit)}`}>
                                                                {update.profit} TON
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <span className="text-sm text-gray-600 dark:text-gray-400">Цена продажи: </span>
                                                        <span className="font-bold text-blue-600 dark:text-blue-400">
                                                            {update.sellPrice} TON
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="mt-3">
                                                    <div className="grid grid-cols-1 gap-2">
                                                        {update.Gifts.map((gift, index) => (
                                                            <div
                                                                key={gift.id}
                                                                className="bg-gray-50 dark:bg-gray-700 rounded p-2 flex justify-between items-center text-sm"
                                                            >
                                                                <div className="flex flex-col">
                                                                    <span className="text-gray-700 dark:text-gray-300">
                                                                        Товар {index + 1}
                                                                    </span>
                                                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                                                        {gift.model}, {gift.symbol}, {gift.backdrop}
                                                                    </span>
                                                                </div>
                                                                <span className="font-medium text-gray-800 dark:text-white">
                                                                    {formatPrice(gift.price * 1.1)} TON
                                                                </span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </Block>
                        ))}
                    </div>
                )}
            </div>
        </PageContainer>
    );
};

export default MainPage;