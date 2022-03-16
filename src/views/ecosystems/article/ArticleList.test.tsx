import React from 'react';
import { render } from '../../../test-utils';
import ArticleList from './ArticleList';
import { server } from '../../../mocks/server';
import { rest } from 'msw';
import { BASE_URL } from '../../../state/apiClient';

describe('ArticleList tests', () => {
  // お試しtest
  describe('first', () => {
    it('fetch', async () => {
      const result = render(<ArticleList />);

      expect(await result.findByText('title: title-0')).toBeInTheDocument();
    });

    describe('res.once sample', () => {
      server.use(
        rest.get(`${BASE_URL}/articles`, (req, res, ctx) => {
          return res.once(
            ctx.status(200),
            ctx.json([
              { id: 0, title: 'title-0', author: { id: 0, name: 'name-0' } },
              { id: 1, title: 'title-1', author: { id: 1, name: 'name-1' } },
              { id: 2, title: 'title-2', author: { id: 1, name: 'name-1' } },
              { id: 3, title: 'title-3', author: { id: 1, name: 'name-1' } },
            ]),
          );
        }),
      );
      it('tmp msw override', async () => {
        const result = render(<ArticleList />);

        expect(await result.findByText('title: title-3')).toBeInTheDocument();
      });
    });
  });
});
