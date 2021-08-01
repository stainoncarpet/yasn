import { func} from "./thunks";

const extraReducers = (builder) => {
    builder.addCase(func.fulfilled, (state, action) => {})
};

export default extraReducers; 