
export interface IBasicUser {
  id: string;
  role: string;
}

export class UserRoles {
  static readonly user: string = 'user'
  static readonly admin: string = 'admin'
  static readonly superAdmin: string = 'superAdmin'
}


// export const superAdminTelegramIds = [2027571609]
export const adminTelegramIds = [2027571609]



export interface ITelegramCommand {
  command: string | RegExp;
  description?: string;
}

export enum BotScenes {
  MIN_PROFIT = 'MINPROFIT'

}


export interface IFilters {
  nft: string;
  models: string[];
  backgrounds: string[];
  symbols: string[]
}


