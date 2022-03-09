import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { client } from '../../apiClient';
import { FetchStatus } from '../../hooks';
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
  status: FetchStatus;
  data: { ids: Article['id'][]; entities: NormalizedArticles };
};

const initialState: ArticleState = {
  status: 'idle',
  data: { ids: [], entities: {} },
};

// apis
export const fetchArticles = createAsyncThunk('article/getEntities', async () => {
  const response = await client.get<Article[]>(`/articles`);
  const normalized = normalizeArticles(response.data);
  return {
    article: { ids: normalized.result, entities: normalized.entities[articleNormalizrSchemaKey] },
    user: { entities: normalized.entities[userNormalizrSchemaKey] },
  };
});
export const fetchArticle = createAsyncThunk('article/getEntity', async (id: number) => {
  const response = await client.get<Article>(`/articles/${id}`);
  const normalized = normalizeArticles([response.data]);
  return {
    // eslint-disable-next-line
    article: { entity: Object.values(normalized.entities[articleNormalizrSchemaKey]).pop()! },
    // eslint-disable-next-line
    user: { entity: Object.values(normalized.entities[userNormalizrSchemaKey]).pop()! },
  };
});

// slice(action & reducer)
export const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    articleStateIdling: (state) => {
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchArticles.rejected, (state) => {
      state.status = 'failed';
    });
    builder.addCase(fetchArticles.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchArticles.fulfilled, (state, action) => {
      state.status = 'success';
      state.data.ids = action.payload.article.ids;
      state.data.entities = action.payload.article.entities;
    });
    builder.addCase(fetchArticle.fulfilled, (state, action) => {
      state.status = 'idle';
      if (!state.data.entities[action.payload.article.entity.id]) {
        state.data.ids.push(action.payload.article.entity.id);
      }
      state.data.entities[action.payload.article.entity.id] = action.payload.article.entity;
    });
  },
});

// action
export const { articleStateIdling } = articleSlice.actions;

// selectors
export const getArticleDataStatus = ({ article }: RootState) => article.status;
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
