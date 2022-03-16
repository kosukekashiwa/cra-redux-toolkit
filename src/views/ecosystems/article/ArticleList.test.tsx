import React from 'react';
import { screen } from '@testing-library/react';
import { render } from '../../../test-utils';
import ArticleList from './ArticleList';

describe('ArticleList tests', () => {
  // お試しtest
  describe('first', () => {
    it('fetch', () => {
      render(<ArticleList />);

      expect(screen.findByText('title-0')).toBeTruthy();
    });
  });
});
