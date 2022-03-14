import { rest } from 'msw';
import articles from './api/articles';

export const handlers = [rest.get('/articles', articles.get)];
