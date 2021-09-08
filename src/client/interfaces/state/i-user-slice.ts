import { IUser } from "./i-profile-slice";

export interface IUserSlice {
    events: IEvents,
    lists: ILists,
    conversation: IConversation
}

export interface IEvents {
    friendRequests: IEventItem,
    newMessages: IEventItem,
    unreadNotifications: IEventItem,
    latestFeed: IEventItem,
    currentEventIndex: number | null
}

export interface IEventItem {
    array: any[],
    unreadCount: number
}

export interface ILists {
    friends: IListItem,
    conversations: IListItem,
    notifications: IListItem,
    feed: IListItem
}

export interface IListItem {
    isLoading: boolean,
    array: Array<any>
}

export interface IConversation {
    _id: string | null,
    isLoading: boolean,
    updateSource: string,
    messages: Array<IMessage>,
    participants: Array<IUser>
}

export interface IMessage {
    _id: string,
    speaker: string,
    content: string,
    dateOfTyping: string,
    isReadBy: Array<IUser | any>
}

export enum EUpdateSource {
    OLD = "OLD",
    NEW = "NEW"
}