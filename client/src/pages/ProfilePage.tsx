import { Block } from "@/components/layout/Block"
import { PageContainer } from "@/components/layout/PageContainer"
import { useUserData } from "@/store/hooks"

export const ProfilePage = () => {
    const { user } = useUserData()

    return (
        <PageContainer title="Профиль">
            <div className="flex flex-col gap-6 w-full">
                <Block>
                    <div className="p-6">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                                {user?.firstName?.[0] || '?'}
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold">{user?.firstName} {user?.lastName}</h2>
                                <p className="text-gray-400">@{user?.username}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <div className="text-sm text-gray-400">Telegram ID</div>
                                <div className="text-lg font-medium">{user?.telegramId || '-'}</div>
                            </div>
                            <div className="space-y-2">
                                <div className="text-sm text-gray-400">Роль</div>
                                <div className="text-lg font-medium">{user?.role}</div>
                            </div>

                        </div>


                        <div className="space-y-2">
                            <div className="text-sm text-gray-400">Минимальная прибыль</div>
                            <div className="text-lg font-medium">{user?.minProfit || '0'} TON</div>
                        </div>
                    </div>
                </Block>

                {/* <Block lighter>
                    <div className="p-6">
                        <h3 className="text-lg font-semibold mb-4">Настройки профиля</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            
                            <div className="space-y-2">
                                <div className="text-sm text-gray-400">Права администратора</div>
                                <div className={`text-lg font-medium ${user?.hasRights ? 'text-green-500' : 'text-red-500'}`}>
                                    {user?.hasRights ? 'Да' : 'Нет'}
                                </div>
                            </div>
                        </div>
                    </div>
                </Block> */}
            </div>
        </PageContainer>
    )
}