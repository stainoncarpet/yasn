import { IAuthSlice } from "./i-auth-slice";
import { IProfileSlice } from "./i-profile-slice";
import { IUserSlice } from "./i-user-slice";
import { IMiscSlice } from "./i-misc-slice";

export interface IStoreState {
    auth: IAuthSlice,
    profile: IProfileSlice,
    user: IUserSlice,
    misc: IMiscSlice
}