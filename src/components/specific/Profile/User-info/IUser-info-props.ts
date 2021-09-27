
import { IAuthSlice } from "../../../../interfaces/state/i-auth-slice";
import {IProfileSlice} from "../../../../interfaces/state/i-profile-slice";

export interface IUserInfoProps {
    info: IProfileSlice["userInfo"],
    auth: IAuthSlice, 
    isLoading: IProfileSlice["isLoading"]
}