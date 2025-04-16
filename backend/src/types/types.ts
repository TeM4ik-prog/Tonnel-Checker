
export interface IBasicUser {
  id: string;
  role: string;
}


export interface ITelegramCommand {
  command: string | RegExp;
  description?: string;
}

export enum BotScenes {
  MIN_PROFIT = 'MINPROFIT'

}


export interface IUserFilters {
  nft: string;
  models: string[];
  backgrounds: string[];
}


