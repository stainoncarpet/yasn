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

const reducers = {
    togglePortal: (state, action) => {
      state.portal.isShown = !state.portal.isShown;
    },
    toggleSnackbar: (state, action) => {
      if(state.snackbar.isShown){
        state.snackbar = initialState.snackbar;
      } else {
        state.snackbar.isShown = !state.snackbar.isShown;
      }
    }
  };

export default reducers;