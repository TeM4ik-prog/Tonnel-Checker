import { RequestStatus } from "@/types";
import { Block } from "../layout/Block"
import { Button } from "../ui/Button";
import { CheckIcon, XIcon } from "lucide-react";
import { IUser, IUserRequest } from "@/types/auth";
import { AdminService } from "@/services/admin.service";
import { onRequest } from "@/types";
import { toast } from "react-toastify";

interface UserRequestProps extends IUserRequest {
    getRequests: () => void;
}



export const UserRequest: React.FC<UserRequestProps> = ({ id, telegramId, status, user, getRequests }) => {

    const handleApprove = async () => {
        const data = await onRequest(AdminService.approveAccessRequest(id))
        console.log("Approve");
        if (data) {
            getRequests()
            toast.success('Запрос одобрен')
        }
    }

    const handleReject = async () => {
        const data = await onRequest(AdminService.rejectAccessRequest(id))
        console.log("Reject");
        if (data) {
            getRequests()
            toast.success('Запрос отклонен')
        }
    }


    return (
        <Block className="gap-4 justify-between !flex-row">
            <div className="flex flex-col gap-1">
                <p>Username: {user.username}</p>
                <p>Telegram ID: {telegramId}</p>
                <p>Status: {status}</p>
            </div>

            <div className="flex flex-col gap-4 justify-center">
                {status === RequestStatus.PENDING && (
                    <>
                        <Button text="Одобрить" color="green" icon={<CheckIcon />} FC={handleApprove} />
                        <Button text="Отклонить" color="red" icon={<XIcon />} FC={handleReject} />
                    </>
                )}
                {status === RequestStatus.APPROVED && (
                    <>
                        <Button text="Одобрено" color="green" />
                        <Button text='Отклонить' color='red' icon={<XIcon />} FC={handleReject} />
                    </>
                )}
                {status === RequestStatus.REJECTED && (
                    <>
                        <Button text="Отклонено" color="red" />

                        <Button text='Одобрить' color='green' icon={<CheckIcon />} FC={handleApprove} />
                    </>
                )}
            </div>
        </Block >
    )
}