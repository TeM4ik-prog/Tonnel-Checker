import { Block } from "@/components/layout/Block"
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { ReviewService } from "@/services/review.service";
import { useUserData } from "@/store/hooks";
import { IReviewUpdate, IUser, onRequest, UserRole } from "@/types";
import { returnObjectFromForm } from "@/utils";
import { PencilIcon, SaveIcon, Trash2Icon, XIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

export interface IReview {
    id: string;
    content: string;
    sourceUrl: string;
    type: 'image' | 'video'
    createdAt: string;

    UserBase: IUser;
    profileElem: boolean;
    canEdit: boolean;

    handleUpdate: (id: string, e: React.FormEvent) => Promise<void>;
    handleDelete: (reviewId: string) => Promise<void>;
}


export const Review = ({ id, content, sourceUrl, handleUpdate, handleDelete, profileElem, UserBase, canEdit = false, createdAt }: IReview) => {
    const [updateDataOpen, setUpdateDataOpen] = useState<boolean>(false)
    const handleUpdateDataOpen = () => setUpdateDataOpen((prev) => !prev);

    const isVideo = sourceUrl.endsWith(".mp4") || sourceUrl.endsWith(".webm");
    const { user } = useUserData()

    if (UserBase) {
        if (!profileElem && UserBase?.id == user?.id) {
            return
        }
    }

    const [formData, setFormData] = useState<IReviewUpdate>({
        content: content
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };


    return (

        <Block className="p-4 flex flex-col gap-3" >
            <p className="whitespace-pre-line text-white ">{UserBase?.name || ''}</p>

            <div className="relative rounded overflow-hidden">
                {isVideo ? (
                    <video
                        controls
                        className="object-contain w-full h-72 md:h-80 lg:h-96 rounded overflow-hidden"
                        src={sourceUrl}
                    />
                ) : (
                    <img
                        className="object-contain w-full h-72 md:h-80 lg:h-96 rounded overflow-hidden"
                        src={sourceUrl}
                        alt="Content"
                    />
                )}

                <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black to-transparent p-4 w-full">
                    {/* <h2 className="text-3xl font-semibold text-white">{title}</h2>
                    <p className="text-sm text-gray-300 mt-1">{formattedDate}</p> */}
                </div>
            </div>

            <p className="whitespace-pre-line text-white ">{content}</p>

            {canEdit && (
                <>
                    {updateDataOpen ? (
                        <Block lighter={true}>
                            <form onSubmit={(e) => { handleUpdate(id, e), handleUpdateDataOpen() }} className="flex flex-col gap-y-2 w-full">
                                <Input
                                    name="content"
                                    placeholder="Заголовок"
                                    value={formData.content}
                                    onChange={handleChange}
                                />

                                <div className="flex flex-row flex-wrap gap-3">
                                    <Button formSubmit={true} icon={<SaveIcon />} text="Сохранить" />

                                    <Modal title="Удаление поста"
                                        content="Выдействительно хотите его удалить?"
                                        buttonColor="red"
                                        buttonCloseText="Удалить"
                                        buttonOpenText="Удалить"
                                        buttonFC={() => { handleDelete(id), handleUpdateDataOpen() }}
                                        icon={<Trash2Icon />}
                                    />

                                    <Button icon={<XIcon />} FC={handleUpdateDataOpen} text="Закрыть" />
                                </div>
                            </form>
                        </Block>
                    ) : (
                        <Button text="" icon={<PencilIcon />} FC={handleUpdateDataOpen} className="absolute top-0 right-0" />
                    )}
                </>
            )}


        </Block>

    )
}