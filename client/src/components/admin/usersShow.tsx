import { User } from "@/components/user/user"
import { AdminService } from "@/services/admin.service"
import { useUserData } from "@/store/hooks"
import { onRequest } from "@/types"
import { IUser } from "@/types/auth"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { Block } from "../layout/Block"
import { Button } from "../ui/Button"
import { PageContainer } from "../layout/PageContainer"
interface IPagination {
  totalCount: number
  maxPage: number
  currentPage: number
  limit: number
}

interface IUsersList {
  users: IUser[]
  pagination: IPagination
}

export const UsersShow: React.FC = () => {
  const { user } = useUserData()

  const [users, setUsers] = useState<IUser[]>([])
  const [pagination, setPagination] = useState<IPagination>({
    totalCount: 0,
    maxPage: 1,
    currentPage: 1,
    limit: 10
  })
  const [isLoading, setIsLoading] = useState(false)

  const fetchUsers = async (page: number) => {
    setIsLoading(true)

    const data = await onRequest(AdminService.getUsers({ page, limit: pagination.limit }))
    console.log(data)
    setUsers(data)
    // setPagination(data.pagination)

  }

  useEffect(() => {
    fetchUsers(pagination.currentPage)
  }, [pagination.currentPage])

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.maxPage) {
      setPagination(prev => ({ ...prev, currentPage: newPage }))
    }
  }

  const handleToggleRights = async (telegramId: number) => {
    console.log(telegramId)

    const data = await onRequest(AdminService.updateUserRights(telegramId))


    if (data) {
      toast.success('Права успешно обновлены')
    }
  }

  return (
    // <Section className="p-4">
    <PageContainer title="Пользователи">




      <Block className="p-1 flex flex-col gap-4">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-700 sticky top-0 ">
              <tr>
                {/* <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Имя
                </th> */}
                <th className="text-center px-1 py-3 text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Username
                </th>
                <th className="text-center p  x-1 py-3 text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Telegram ID
                </th>
                <th className="text-center px-1 py-3 text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Права
                </th>
                <th className="text-center px-1 py-3 text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Роль
                </th>
              </tr>
            </thead>

            <tbody className="bg-gray-800 divide-y divide-gray-800">
              {users && users.map(userData => (
                <User key={userData.id} user={userData} isAdmin={userData.id === user?.id} onToggleRights={handleToggleRights} />
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center items-center gap-2">

          <Button
            text="← Назад"
            FC={() => handlePageChange(pagination.currentPage - 1)}
            disabled={pagination.currentPage === 1}
          />
          <Button
            text="Вперед →"
            FC={() => handlePageChange(pagination.currentPage + 1)}
            disabled={pagination.currentPage === pagination.maxPage}
          />
        </div>

      </Block>
    </PageContainer>



    // </Section>
  )
}
