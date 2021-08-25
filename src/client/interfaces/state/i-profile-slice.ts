export interface IProfileSlice {
    userInfo: {
        _id: string | null,
        fullName: string | null,
        userName: string | null,
        dateOfBirth: string | null,
        dateOfRegistration: string | null,
        avatar: string | null,
        lastOnline: string | number | null,
        friendshipStatusWithRequester: string | null
    },
    friends: {
        totalFriendsCount: number | null,
        selection: IFriend[]
    },
    posts: Array<IPost>,
    isLoading: boolean
}

export interface IFriend {
    user: string,
    friendshipStatus: IFriendshipStatus
}

export interface IUser {
    _id: string,
    fullName: string,
    uerName: string,
    avatar: string
}

export interface IFriendshipStatus {
    status: string,
    fshipId: string
}

export interface IPost {
    comments: IComment[],
    likers: string[],
    dislikers: string[],
    reposters: string[],
    _id: string,
    dateOfPublication: string,
    title: string,
    content: string,
    author: IUser,
    areCommentsDisplayed: boolean
}

export interface IComment {
    replyTo: any,
    likers: string[],
    dislikers: string[],
    _id: string,
    dateOfPublication: string,
    content: string,
    author: IUser,
    post: string
}