import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { client } from '../../apiClient';
import { RootState } from '../../store';
import { User } from './models';

export type UserState = {
  dataReady: boolean;
  data: User[];
};

const initialState: UserState = {
  dataReady: false,
  data: [],
};

// apis
export const fetchUsers = createAsyncThunk('user/get', async () => {
  const response = await client.get<User[]>(`/users`);
  return response.data;
});

// reducers
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.dataReady = false;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.dataReady = true;
      state.data = action.payload;
    });
  },
});

// selectors
export const getUsers = (state: RootState) => state.user.data;

export default userSlice.reducer;
