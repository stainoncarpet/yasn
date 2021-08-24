import { IMessage } from "../state/i-user-slice";

export interface IMessageAction {
    payload: {
        conversationId: string,
        newMessage: IMessage,
    }
}