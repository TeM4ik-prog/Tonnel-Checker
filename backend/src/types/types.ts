
export interface IBasicUser {
  id: string;
  role: string;
}


export interface ITelegramCommand {
  command: string | RegExp;
  description?: string;
}


