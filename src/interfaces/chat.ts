export interface IMessageToApi {
  role: string;
  content: string;
}

export interface IMessageItem extends IMessageToApi {
  date: Date;
}

export interface IChatItem {
  id: string;
  dateTime: Date;
  title: string;
  messages: IMessageItem[]
}