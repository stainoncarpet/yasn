import { EFriendshipStatus, IUser } from "../../../interfaces/state/i-profile-slice";

export interface IFRequestReceiveActionResult {
    msg?:string,
    type: string,
    payload: {
        notification: INotification,
        requester?: {
            user: {
                _id: string,
                fullName: string,
                userName: string,
                avatar: string
            },
            friendshipStatus: {
                status: EFriendshipStatus,
                fshipId: string
            }
        }
    }
}

export interface INotification {
    type: string,
    dateOfCreation: string,
    isRead: boolean,
    owner: string,
    content: string
}

export interface IFRequestAcceptActionResult {
    type: string,
    payload: {
        msg?:string,
        notification: INotification,
        newFriend?: {
            _id: string,
            fullName: string,
            userName: string,
            avatar: string,
            fshipStatus: EFriendshipStatus, 
            fshipId: string
        }
    }
}

export interface ITypingEventActionResult {
    type: string,
    payload: {
        typingUser: IUser, 
        conversationId: string
    }
}