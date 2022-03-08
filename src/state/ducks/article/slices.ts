import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { client } from '../../apiClient';
import { RootState } from '../../store';
import { userNormalizrSchemaKey } from '../user/models';
import {
  denormalizeArticles,
  NormalizedArticles,
  normalizeArticles,
  Article,
  articleNormalizrSchemaKey,
} from './models';

export type ArticleState = {
  dataReady: boolean;
  data: { ids: Article['id'][]; entities: NormalizedArticles };
};

const initialState: ArticleState = {
  dataReady: false,
  data: { ids: [], entities: {} },
};

// apis
export const fetchArticles = createAsyncThunk('article/get', async () => {
  const response = await client.get<Article[]>(`/articles`);
  // Normalized the data before passing it to our reducer
  const normalized = normalizeArticles(response.data);
  return normalized;
});

// slice(action & reducer)
export const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchArticles.rejected, (state) => {
      state.dataReady = false;
    });
    builder.addCase(fetchArticles.pending, (state) => {
      state.dataReady = false;
    });
    builder.addCase(fetchArticles.fulfilled, (state, action) => {
      state.dataReady = true;
      state.data.ids = action.payload.result;
      state.data.entities = action.payload.entities[articleNormalizrSchemaKey];
    });
  },
});

// selectors
export const getArticles = ({ article, user }: RootState) =>
  denormalizeArticles({
    result: article.data.ids,
    entities: {
      [articleNormalizrSchemaKey]: article.data.entities,
      [userNormalizrSchemaKey]: user.data.entities,
    },
  });

export default articleSlice.reducer;
