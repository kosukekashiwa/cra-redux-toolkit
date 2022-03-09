import { Box, Card, CardContent } from '@mui/material';
import React from 'react';
import { Article } from '../../../state/ducks/article/models';

export type ArticleCardProps = {
  article: Article;
};

const ArticleCard: React.VFC<ArticleCardProps> = (props) => {
  return (
    <Card>
      <CardContent>
        <Box>title: {props.article.title}</Box>
        <Box>author: {props.article.author.name}</Box>
      </CardContent>
    </Card>
  );
};

export default ArticleCard;
