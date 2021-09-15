export interface IMiscSlice {
    portal: {
        isShown: boolean,
        component: EPortalComponent
    },
    snackbar: {
        isShown: boolean,
        content: string,
        type: ESnackbarType
    }
}

export enum ESnackbarType {
    NONE = "NONE",
    NORMAL = "NORMAL",
    DANGER = "DANGER",
    SUCCESS = "SUCCESS"
}

export enum EPortalComponent {
    NONE = "NONE",
    LOGINFORM = "LOGINFORM",
    SIGNUPFORM = "SIGNUPFORM",
    NEWPOSTFORM = "NEWPOSTFORM",
    PASSWORDRESETFORM = "PASSWORDRESETFORM"
}