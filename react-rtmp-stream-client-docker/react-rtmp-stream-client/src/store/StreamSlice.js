import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLive: 0,
  soundVolume: 50
};
const streamSlice = createSlice({
  name: 'stream-state',
  initialState,
  reducers: {
    setLiveProperty: (state, action) => {
      state.isLive = action.payload;
    },
    setSoundVolume: (state, action) => {
      state.soundVolume = action.payload;
    }
  }
});
export default streamSlice.reducer;
export const selectIsLive = (state) => state.streamSlice.isLive;
export const selectSoundVolume = (state) => state.streamSlice.soundVolume;
export const { setLiveProperty, setSoundVolume } = streamSlice.actions;
