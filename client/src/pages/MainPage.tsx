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

// ["B-Day Candle","Bunny Muffin","Jack-in-the-Box","Astral Shard", "Berry Box", "Candy Cane", "Cookie Heart", "Crystal Ball", "Desk Calendar", "Diamond Ring", "Durov's Cap", "Electric Skull", "Eternal Candle", "Eternal Rose", "Evil Eye", "Flying Broom", "Genie Lamp", "Ginger Cookie", "Hanging Star", "Hex Pot", "Homemade Cake", "Hypno Lollipop", "Ion Gem", "Jelly Bunny", "Jester Hat", "Jingle Bells", "Kissed Frog", "Lol Pop", "Loot Bag", "Love Candle", "Love Potion", "Lunar Snake", "Mad Pumpkin", "Magic Potion", "Mini Oscar", "Neko Helmet", "Party Sparkler", "Perfume Bottle", "Plush Pepe", "Precious Peach", "Record Player", "Sakura Flower", "Santa Hat", "Scared Cat", "Sharp Tongue", "Signet Ring", "Skull Flower", "Sleigh Bell", "Snow Globe", "Snow Mittens", "Spiced Wine", "Spy Agaric", "Star Notepad", "Swiss Watch", "Tama Gadget", "Top Hat", "Toy Bear", "Trapped Heart", "Vintage Cigar", "Voodoo Doll", "Winter Wreath", "Witch Hat"];

const MainPage: React.FC = () => {
    const [lastUpdate, setLastUpdate] = useState<IPackGiftsDataUpdate | null>(null)
    const [loading, setLoading] = useState(true);

    const location = useLocation();

    const updateData = async () => {
        setLoading(true);
        const data = await onRequest(GiftService.getLastUpdate())
        if (data) {
            setLastUpdate(data)
        }
        setLoading(false);
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

                {/* <Button
                    text="close"
                    FC={() => window.Telegram?.WebApp.close()}
                />                
 */}


                {/* <Button
                    text="redirect"
                    href="https://tonnel-gift.vercel.app"

                /> */}

                {/* <a href="https://tonnel-gift.vercel.app/verify">open</a> */}


                {/* <iframe className="w-max h-96" id="child" src="https://market.tonnel.network/verify" sandbox="allow-scripts allow-same-origin"></iframe> */}

                {lastUpdate && (
                    <div className="space-y-3">
                        {lastUpdate.GiftsDataUpdate.map((update) => (
                            <Block key={update.id} className="p-3">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                                    <div className="flex-1">
                                        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                                            {update.Gifts[0]?.name || 'Загрузка...'}
                                        </h2>
                                        <div className="flex items-center gap-3">
                                            <span className={`text-2xl font-bold ${getProfitColor(update.profit)}`}>
                                                {update.profit} TON
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-sm text-gray-600 dark:text-gray-400">Цена продажи: </span>
                                        <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                                            {update.sellPrice} TON
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-3">
                                    <div className="grid grid-cols-1 gap-2">
                                        {update.Gifts.map((gift, index) => (
                                            <div
                                                key={gift.id}
                                                className="bg-gray-50 dark:bg-gray-800/50 rounded p-2 flex justify-between items-center text-sm"
                                            >
                                                <span className="text-gray-700 dark:text-gray-300">
                                                    Товар {index + 1}
                                                </span>
                                                <span className="font-medium text-gray-800 dark:text-white">
                                                    {formatPrice(gift.price * 1.1)} TON
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Block>
                        ))}
                    </div>
                )}
            </div>
        </PageContainer>
    );
};

export default MainPage;