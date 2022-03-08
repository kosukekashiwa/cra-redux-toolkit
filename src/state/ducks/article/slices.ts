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
export const fetchArticles = createAsyncThunk('articles/get', async () => {
  const response = await client.get<Article[]>(`/articles`);
  // Normalized the data before passing it to our reducer
  const normalized = normalizeArticles(response.data);
  return {
    ids: normalized.result,
    articles: normalized.entities[articleNormalizrSchemaKey],
    users: normalized.entities[userNormalizrSchemaKey],
  };
});
export const fetchArticle = createAsyncThunk('article/get', async (id: number) => {
  const response = await client.get<Article>(`/articles/${id}`);
  // Normalized the data before passing it to our reducer
  const normalized = normalizeArticles([response.data]);
  return {
    article: Object.values(normalized.entities[articleNormalizrSchemaKey]).pop()!,
    user: Object.values(normalized.entities[userNormalizrSchemaKey]).pop()!,
  };
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
      state.data.ids = action.payload.ids;
      state.data.entities = action.payload.articles;
    });
    builder.addCase(fetchArticle.fulfilled, (state, action) => {
      state.dataReady = true;
      if (!state.data.entities[action.payload.article.id]) {
        state.data.ids.push(action.payload.article.id);
      }
      state.data.entities[action.payload.article.id] = action.payload.article;
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
export const getArticle = ({ article, user }: RootState, id: number) =>
  denormalizeArticles({
    result: [id],
    entities: {
      [articleNormalizrSchemaKey]: article.data.entities,
      [userNormalizrSchemaKey]: user.data.entities,
    },
  }).pop();

export default articleSlice.reducer;
