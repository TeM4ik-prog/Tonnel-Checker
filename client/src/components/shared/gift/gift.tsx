import { IGift, IUserFilters } from "@/types/gift";

interface GiftProps {
    gift: IGift;
    itemFilters: IUserFilters;
}

export const Gift = ({ gift, itemFilters }: GiftProps) => {
    const modelsExists = itemFilters.models.find(model => model == gift.model);
    const backgroundExists = itemFilters.backgrounds.find(back => back == gift.backdrop);
    const symbolExists = itemFilters.symbols.find(symb => symb == gift.symbol);

    const displayExistingParam = (param: keyof IGift, existingParamName: string | undefined) => {
        return (
            <p className={`${existingParamName ? 'bg-yellow-400 rounded text-xs text-black' : ''} p-1`}>
                {String(gift[param])}
            </p>
        );
    };

    return (
        <div className="bg-gray-50 dark:bg-gray-700 rounded p-1 flex justify-between items-center text-sm">
            <div className="flex flex-col">
                <span className="text-gray-700 dark:text-gray-300">
                    Товар
                </span>
                <span className="flex gap-1 flex-row text-xs text-gray-500 dark:text-gray-400">
                    {displayExistingParam("model", modelsExists)}
                    {displayExistingParam("backdrop", backgroundExists)}
                    {displayExistingParam("symbol", symbolExists)}
                </span>
            </div>
            <span className="font-medium text-gray-800 w-min dark:text-white end-0">
                {(gift.price * 1.1).toFixed(2)} TON
            </span>
        </div>
    );
};
