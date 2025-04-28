import { IGiftDataUpdate, IUserFilters } from "@/types/gift"
import { Gift } from "./gift"

interface GiftsListProps {
    update: IGiftDataUpdate
    itemFilters: IUserFilters
}

export const GiftsList = ({ update, itemFilters }: GiftsListProps) => {
    return (
        <div className="mt-3">
            <div className="grid grid-cols-1 gap-2">
                {update.Gifts.map((gift, index) => (
                    <Gift 
                        key={gift.id} 
                        gift={gift} 
                        itemFilters={itemFilters}
                    />
                ))}
            </div>
        </div>
    )
}
