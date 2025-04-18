
export interface IBasicUser {
  id: string;
  role: string;
}

export const validTelegramIds = [2027571609]



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


