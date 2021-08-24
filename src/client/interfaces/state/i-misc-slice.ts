export interface IMiscSlice {
    portal: {
        isShown: boolean
    },
    snackbar: {
        isShown: boolean,
        content: string | null,
        type: string | null
    }
}