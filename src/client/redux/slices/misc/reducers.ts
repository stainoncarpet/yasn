import { initialState } from "./misc";

interface IAction {
    payload: IPayload
}

interface IPayload {
    conversationId: string,
    newMessage: IMessage,
}

interface IMessage {
    _id: string,
    speaker: ISpeaker,
    content: string,
    dateOfTyping: string
}

interface ISpeaker {
    _id: string
}

import { IMiscSlice } from "../../../interfaces/state/i-misc-slice";

const reducers = {
    togglePortal: (state: IMiscSlice, action) => {
      state.portal.isShown = !state.portal.isShown;
    },
    toggleSnackbar: (state: IMiscSlice, action) => {
      if(state.snackbar.isShown){
        state.snackbar = initialState.snackbar;
      } else {
        state.snackbar.isShown = action.payload.isShown || !state.snackbar.isShown;
        state.snackbar.content = action.payload.content || initialState.snackbar.content
        state.snackbar.type = state.snackbar.type || initialState.snackbar.type
      }
    }
  };

export default reducers;