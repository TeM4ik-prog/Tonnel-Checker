import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@/database/database.service';
import { RequestStatus, UserRoles } from '@prisma/client';
import { Context } from 'telegraf';
import { TelegramService } from '@/telegram/telegram.service';

@Injectable()
export class AdminService {
    constructor(
        private readonly database: DatabaseService,
        private readonly telegramService: TelegramService) { }

    async getAccessRequests(status: RequestStatus) {
        return await this.database.accessRequest.findMany({
            where: {
                status,
                user: {
                    role: {
                        not: UserRoles.ADMIN
                    }
                }

            },
            include: {
                user: true
            }
        });
    }

    async createAccessRequest(ctx: Context) {
        const existingRequest = await this.database.accessRequest.findUnique({
            where: { telegramId: ctx.from.id }
        });

        console.log(existingRequest);


        if (existingRequest) {
            await ctx.reply('Вы уже отправили запрос на доступ.');
            return
        }

        if (existingRequest && existingRequest.status === RequestStatus.APPROVED) {
            await ctx.reply('Вы уже имеете доступ к боту.');
            return
        }


        await this.telegramService.sendMessageToAdmins(`Пользователь ${ctx.from.username} (${ctx.from.id}) хочет получить доступ к боту.`)


        await ctx.reply('Запрос на доступ отправлен администратору.');

        return await this.database.accessRequest.create({
            data: {
                telegramId: ctx.from.id
            }
        });
    }

    async approveAccessRequest(requestId: string) {
        const request = await this.database.accessRequest.update({
            where: { id: requestId },
            data: { status: RequestStatus.APPROVED },
            include: { user: true }
        });

        await this.telegramService.sendMessage(request.user.telegramId,
             'Ваш запрос на доступ был одобрен. Теперь вы можете использовать бота.\n\nнажмите /start для запуска');

        return await this.database.user.update({
            where: { id: request.user.id },
            data: { hasAccess: true }
        });
    }

    async rejectAccessRequest(requestId: string) {
        const request = await this.database.accessRequest.update({
            where: { id: requestId },
            data: { status: RequestStatus.REJECTED },
            include: { user: true }
        });

        await this.telegramService.sendMessage(request.user.telegramId, 'Ваш запрос на доступ был отклонен.');

        return await this.database.user.update({
            where: { id: request.user.id },
            data: { hasAccess: false }
        });
    }
}
