export interface IMiscSlice {
    portal: {
        isShown: boolean
    },
    snackbar: {
        isShown: boolean,
        content: string,
        type: ESnackbarType
    }
}

export enum ESnackbarType {
    NORMAL = "NORMAL",
    DANGER = "DANGER",
    SUCCESS = "SUCCESS"
}