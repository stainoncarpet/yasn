export interface IAuthSlice {
    _id: string | null,
    fullName: string | null,
    userName: string | null,
    email: string | null,
    dateOfBirth: string | null,
    dateOfRegistration: string | null,
    token: string | null,
    avatar: string | null,
    isLoading: boolean
}