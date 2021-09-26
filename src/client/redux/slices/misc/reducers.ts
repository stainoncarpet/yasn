import { initialState } from "./misc";
import { EPortalComponent, ESnackbarType, IMiscSlice } from "../../../interfaces/state/i-misc-slice";

interface IPortalAction {
  type: string,
  payload: {
    isShown?: boolean,
    content?: string,
    type?: ESnackbarType,
    component?: EPortalComponent
  }
}

const reducers = {
    togglePortal: (state: IMiscSlice, action: IPortalAction) => {
      if(!action.payload.component) {
        state.portal.isShown = !state.portal.isShown;
        state.portal.component = EPortalComponent.NONE;
      } else {
        state.portal.isShown = !state.portal.isShown;
        state.portal.component = action.payload.component;
      }
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