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
export const fetchUsers = createAsyncThunk('user/getEntities', async () => {
  const response = await client.get<User[]>(`/users`);
  const normalized = normalizeUsers(response.data);
  return { user: { ids: normalized.result, entites: normalized.entities } };
});
export const fetchUser = createAsyncThunk('user/getEntity', async (id: number) => {
  const response = await client.get<User>(`/users/${id}`);
  return { user: { entity: response.data } };
});
export const postUser = createAsyncThunk('user/postEntity', async (name: string) => {
  await client.post(`/users`, { name });
});
export const putUser = createAsyncThunk('user/putEntity', async (user: User) => {
  await client.put(`/users/${user.id}`, { name: user.name });
});
export const deleteUser = createAsyncThunk('user/deleteEntity', async (id: number) => {
  await client.delete(`/users/${id}`);
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
      state.data.ids = action.payload.user.ids;
      state.data.entities = action.payload.user.entites[userNormalizrSchemaKey];
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.status = 'success';
      if (!state.data.entities[action.payload.user.entity.id]) {
        state.data.ids.push(action.payload.user.entity.id);
      }
      state.data.entities[action.payload.user.entity.id] = action.payload.user.entity;
    });
    builder.addCase(postUser.fulfilled, (state) => {
      state.status = 'idle';
    });
    builder.addCase(putUser.fulfilled, (state) => {
      state.status = 'idle';
    });
    builder.addCase(deleteUser.fulfilled, (state) => {
      state.status = 'idle';
    });
    // chenge state by article
    builder.addCase(fetchArticles.fulfilled, (state, action) => {
      state.status = 'success';
      Object.values(action.payload.user.entities).forEach((user) => {
        if (!state.data.entities[user.id]) {
          state.data.ids.push(user.id);
        }
        state.data.entities[user.id] = user;
      });
    });
    builder.addCase(fetchArticle.fulfilled, (state, action) => {
      state.status = 'success';
      if (!state.data.entities[action.payload.user.entity.id]) {
        state.data.ids.push(action.payload.user.entity.id);
      }
      state.data.entities[action.payload.user.entity.id] = action.payload.user.entity;
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
