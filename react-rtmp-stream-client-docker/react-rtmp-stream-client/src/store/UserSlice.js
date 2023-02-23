import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const convertImageToUrl = (imageData) => {
  const reader = new FileReader();
  return new Promise((resolve) => {
    reader.onload = (ev) => {
      resolve(ev.target.result);
    };
    reader.readAsDataURL(imageData);
  });
};

export const setUserPhotoThunk = createAsyncThunk('user/readDataUrl', async (imageData) => {
  let resault = await convertImageToUrl(imageData);
  return resault;
});

const initialState = {
  userLinks: new Array(5).fill({ linkTitle: '', linkURL: '' }),
  userAvatar: '',
  userInfo: {
    userName: '',
    streamName: '',
    userStreamKey: '',
    userColorTheme: '#535bf2'
  }
};

const userSlice = createSlice({
  name: 'user-state',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    addNewUserLink: (state, action) => {
      state.userLinks.every((v, i) => {
        if (v.linkURL == '') {
          state.userLinks[i] = action.payload;

          return false;
        }
        return true;
      });
    },
    deleteUserLinkByURL: (state, action) => {
      state.userLinks.every((v, i) => {
        if (v.linkURL == action.payload) {
          state.userLinks[i].linkTitle = '';
          state.userLinks[i].linkURL = '';
          return false;
        }
        return true;
      });
    },
    changeUserLink: (state, action) => {
      state.userLinks.every((v, i) => {
        if (v.linkURL == action.payload.old.linkURL) {
          state.userLinks[i] = action.payload.new;
          return false;
        }
        return true;
      });
    }
  },
  extraReducers(builder) {
    builder.addCase(setUserPhotoThunk.fulfilled, (state, action) => {
      state.userAvatar = action.payload;
    });
  }
});

export default userSlice.reducer;
export const selectUserInfo = (state) => state.userSlice.userInfo;
export const selectUserLinks = (state) => state.userSlice.userLinks;
export const selectUserAvatar = (state) => {
  return state.userSlice.userAvatar;
};
export const { setUserInfo, addNewUserLink, deleteUserLinkByURL, changeUserLink } =
  userSlice.actions;
