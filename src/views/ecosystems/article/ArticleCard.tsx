import { Box, Card, CardContent } from '@mui/material';
import React, { useCallback } from 'react';
import { Article } from '../../../state/ducks/article/models';
import { deleteArticle } from '../../../state/ducks/article/slices';
import { useAppDispatch } from '../../../state/hooks';
import DeleteButton from '../../atoms/buttons/DeleteButton';

export type ArticleCardProps = {
  article: Article;
};

const ArticleCard: React.VFC<ArticleCardProps> = (props) => {
  const dispatch = useAppDispatch();

  const handleDeleteButtonClick = useCallback(() => {
    dispatch(deleteArticle(props.article.id));
  }, [dispatch, props.article]);

  return (
    <Card>
      <CardContent>
        <Box>title: {props.article.title}</Box>
        <Box>author: {props.article.author.name}</Box>
        <Box>
          <DeleteButton onClick={handleDeleteButtonClick} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default ArticleCard;
