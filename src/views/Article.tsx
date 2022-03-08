import { Box, Card, CardContent, Stack } from '@mui/material';
import React from 'react';
import { useAppSelector, useFetch } from '../state/hooks';
import {
  articleStateIdling,
  fetchArticles,
  getArticleDataStatus,
  getArticles,
} from '../state/ducks/article/slices';

const Article: React.VFC = () => {
  const articleDataStatus = useAppSelector(getArticleDataStatus);
  const articles = useAppSelector(getArticles);
  useFetch(articleDataStatus, articleStateIdling, fetchArticles());

  return (
    <Card>
      <CardContent>
        <Stack>
          <Box>
            <Box>Articles</Box>
            {articles.map((article) => (
              <Box key={article.id}>
                {article.title} {article.author.name}
              </Box>
            ))}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default Article;
