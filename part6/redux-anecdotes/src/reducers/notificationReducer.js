import { createSlice } from "@reduxjs/toolkit";

const initialState = "";
const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    message(state, action) {
      const message = action.payload;
      return message;
    },
  },
});

const { message } = notificationSlice.actions;

export const setNotificacion = (content, time) => {
  return async (dispatch) => {
    dispatch(message(content));
    setTimeout(() => {
      dispatch(message(""));
    }, time * 1000);
  };
};
export default notificationSlice.reducer;
