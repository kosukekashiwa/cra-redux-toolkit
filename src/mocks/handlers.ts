import { rest } from 'msw';
import { BASE_URL } from '../state/apiClient';
import articles from './api/articles';

export const handlers = [rest.get(`${BASE_URL}/articles`, articles.get)];
