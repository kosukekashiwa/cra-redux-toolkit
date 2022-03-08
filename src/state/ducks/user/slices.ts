import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { client } from '../../apiClient';
import { RootState } from '../../store';
import { fetchArticles } from '../article/slices';
import {
  denormalizeUsers,
  NormalizedUsers,
  normalizeUsers,
  User,
  userNormalizrSchemaKey,
} from './models';

export type UserState = {
  dataReady: boolean;
  data: { ids: User['id'][]; entities: NormalizedUsers };
};

const initialState: UserState = {
  dataReady: false,
  data: { ids: [], entities: {} },
};

// apis
export const fetchUsers = createAsyncThunk('user/get', async () => {
  const response = await client.get<User[]>(`/users`);
  // Normalized the data before passing it to our reducer
  const normalized = normalizeUsers(response.data);
  return normalized;
});

// slice(action & reducer)
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.rejected, (state) => {
      state.dataReady = false;
    });
    builder.addCase(fetchUsers.pending, (state) => {
      state.dataReady = false;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.dataReady = true;
      state.data.ids = action.payload.result;
      state.data.entities = action.payload.entities[userNormalizrSchemaKey];
    });
    builder.addCase(fetchArticles.fulfilled, (state, action) => {
      state.dataReady = true;
      Object.values(action.payload.entities[userNormalizrSchemaKey]).forEach((user) => {
        if (!state.data.entities[user.id]) {
          state.data.ids.push(user.id);
        }
        state.data.entities[user.id] = user;
      });
    });
  },
});

// selectors
export const getUsers = ({ user }: RootState) =>
  denormalizeUsers({
    result: user.data.ids,
    entities: { [userNormalizrSchemaKey]: user.data.entities },
  });

export default userSlice.reducer;
