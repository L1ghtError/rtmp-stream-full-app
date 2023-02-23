import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isFullScreen: 0
};
const StreamSliceNotPersisted = createSlice({
  name: 'stream-slice-np',
  initialState,
  reducers: {
    setFullScreenProperty: (state, action) => {
      state.isFullScreen = action.payload;
    }
  }
});
export default StreamSliceNotPersisted.reducer;
export const selectFullScreenProperty = (state) => {
  return state.StreamSliceNotPersisted.isFullScreen;
};

export const { setFullScreenProperty } = StreamSliceNotPersisted.actions;
