import { useEffect, useState } from "react"
import { PageContainer } from "../layout/PageContainer"
import { AdminService } from "@/services/admin.service"
import { onRequest, RequestStatus } from "@/types"
import { Button } from "../ui/Button"
import { UserRequest } from "../user/userRequest"
import { IUserRequest } from "@/types/auth"
export const AccessRequests: React.FC = () => {
    const [status, setStatus] = useState<RequestStatus>(RequestStatus.PENDING)
    const [requests, setRequests] = useState<IUserRequest[]>([])

    const getRequests = async () => {
        const data = await onRequest(AdminService.getAccessRequestsByStatus(status))
        console.log(data)

        if (data) {
            setRequests(data)
        }
    }



    useEffect(() => {
        getRequests()
    }, [status])

    return (
        <PageContainer title="Запросы на доступ">

            <div className="flex flex-row gap-4 justify-center">
                <Button text="Одобрено" color="green" className={`${status != RequestStatus.APPROVED ? '!bg-gray-500' : ''}`} FC={() => setStatus(RequestStatus.APPROVED)} />
                <Button text="Отклонено" color="red" className={`${status != RequestStatus.REJECTED ? '!bg-gray-500' : ''}`} FC={() => setStatus(RequestStatus.REJECTED)} />
                <Button text="В ожидании" className={`${status != RequestStatus.PENDING ? '!bg-gray-500' : ''}`} FC={() => setStatus(RequestStatus.PENDING)} />
            </div>

            <div className="flex flex-col gap-4">
                {requests.length === 0 && (
                    <div className="flex flex-col gap-4">
                        <p className="text-center text-gray-500">Нет запросов</p>
                    </div>
                )}
                {requests && requests.map((request) => (
                    <UserRequest key={request.id} {...request} getRequests={getRequests} />

                ))}
            </div>

        </PageContainer>
    )
}