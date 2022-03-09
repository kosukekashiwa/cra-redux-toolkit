import { Box, Grid, Paper, Stack } from '@mui/material';
import React from 'react';
import { useAppSelector, useFetch } from '../../../state/hooks';
import {
  articleStateIdling,
  fetchArticles,
  getArticleDataStatus,
  getArticles,
} from '../../../state/ducks/article/slices';
import ArticleCard from './ArticleCard';
import { grey } from '@mui/material/colors';

const ArticleList: React.VFC = () => {
  const articleDataStatus = useAppSelector(getArticleDataStatus);
  const articles = useAppSelector(getArticles);
  useFetch(articleDataStatus, articleStateIdling, fetchArticles());

  return (
    <Paper variant="outlined" sx={{ padding: 2, background: grey[50] }}>
      <Stack spacing={2}>
        <Box>Article List</Box>
        <Box>
          <Grid container spacing={2}>
            {articles.map((article) => (
              <Grid key={article.id} item xs={4}>
                <ArticleCard article={article} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Stack>
    </Paper>
  );
};

export default ArticleList;
