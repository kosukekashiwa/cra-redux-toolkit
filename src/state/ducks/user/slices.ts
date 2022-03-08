import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { client } from '../../apiClient';
import { FetchStatus } from '../../hooks';
import { RootState } from '../../store';
import { fetchArticle, fetchArticles } from '../article/slices';
import {
  denormalizeUsers,
  NormalizedUsers,
  normalizeUsers,
  User,
  userNormalizrSchemaKey,
} from './models';

export type UserState = {
  status: FetchStatus;
  data: { ids: User['id'][]; entities: NormalizedUsers };
};

const initialState: UserState = {
  status: 'idle',
  data: { ids: [], entities: {} },
};

// apis
export const fetchUsers = createAsyncThunk('users/get', async () => {
  const response = await client.get<User[]>(`/users`);
  // Normalized the data before passing it to our reducer
  const normalized = normalizeUsers(response.data);
  return normalized;
});
export const fetchUser = createAsyncThunk('user/get', async (id: number) => {
  const response = await client.get<User>(`/users/${id}`);
  return response.data;
});
export const postUser = createAsyncThunk('user/post', async (name: string) => {
  await client.post(`/users`, { name });
});

// slice(action & reducer)
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userStateIdling: (state) => {
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.rejected, (state) => {
      state.status = 'failed';
    });
    builder.addCase(fetchUsers.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.status = 'success';
      state.data.ids = action.payload.result;
      state.data.entities = action.payload.entities[userNormalizrSchemaKey];
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.status = 'success';
      if (!state.data.entities[action.payload.id]) {
        state.data.ids.push(action.payload.id);
      }
      state.data.entities[action.payload.id] = action.payload;
    });
    builder.addCase(postUser.fulfilled, (state) => {
      state.status = 'idle';
    });
    // chenge state by article
    builder.addCase(fetchArticles.fulfilled, (state, action) => {
      state.status = 'success';
      Object.values(action.payload.users).forEach((user) => {
        if (!state.data.entities[user.id]) {
          state.data.ids.push(user.id);
        }
        state.data.entities[user.id] = user;
      });
    });
    builder.addCase(fetchArticle.fulfilled, (state, action) => {
      state.status = 'success';
      if (!state.data.entities[action.payload.user.id]) {
        state.data.ids.push(action.payload.user.id);
      }
      state.data.entities[action.payload.user.id] = action.payload.user;
    });
  },
});

// action
export const { userStateIdling } = userSlice.actions;

// selectors
export const getUserDataStatus = ({ user }: RootState) => user.status;
export const getUsers = ({ user }: RootState) =>
  denormalizeUsers({
    result: user.data.ids,
    entities: { [userNormalizrSchemaKey]: user.data.entities },
  });
export const getUser = ({ user }: RootState, id: number) => user.data.entities[id];

export default userSlice.reducer;
