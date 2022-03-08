import React, { useCallback } from 'react';
import { Counter } from '../features/counter/Counter';
import { Box, Button, Card, CardContent, Stack } from '@mui/material';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { fetchUser, fetchUsers, getUser, getUsers } from '../state/ducks/user/slices';
import {
  fetchArticle,
  fetchArticles,
  getArticle,
  getArticles,
} from '../state/ducks/article/slices';
import { RootState } from '../state/store';

const App: React.VFC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="cra-app" />} />
        <Route path="cra-app">
          <Route index element={<Navigate to="dashbord" />} />
          <Route path="dashbord" element={<SampleComponent />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

const SampleComponent: React.VFC = () => {
  const users = useAppSelector(getUsers);
  const user = useAppSelector((state: RootState) => getUser(state, 1));
  const articles = useAppSelector(getArticles);
  const article = useAppSelector((state: RootState) => getArticle(state, 1));

  const dispatch = useAppDispatch();
  const hadleUsersClick = useCallback(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  const hadleUserClick = useCallback(() => {
    dispatch(fetchUser(1));
  }, [dispatch]);
  const hadleArticlesClick = useCallback(() => {
    dispatch(fetchArticles());
  }, [dispatch]);
  const hadleArticleClick = useCallback(() => {
    dispatch(fetchArticle(1));
  }, [dispatch]);

  return (
    <Box>
      <Stack spacing={1}>
        <Card>
          <CardContent>
            <Counter />
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Stack direction="column" spacing={1}>
              <Box>
                <Box>Users</Box>
                <Box>
                  <Button variant="outlined" onClick={hadleUsersClick}>
                    Fetch
                  </Button>
                </Box>
                {users.map((user) => (
                  <Box key={user.id}>{user.name}</Box>
                ))}
              </Box>
              <Box>
                <Box>User</Box>
                <Box>
                  <Button variant="outlined" onClick={hadleUserClick}>
                    Fetch
                  </Button>
                </Box>
                {user && <Box>id1: {user.name}</Box>}
              </Box>
            </Stack>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Stack>
              <Box>
                <Box>Articles</Box>
                <Box>
                  <Button variant="outlined" onClick={hadleArticlesClick}>
                    Fetch
                  </Button>
                </Box>
                {articles.map((article) => (
                  <Box key={article.id}>
                    {article.title} {article.author.name}
                  </Box>
                ))}
              </Box>
              <Box>
                <Box>Article</Box>
                <Box>
                  <Button variant="outlined" onClick={hadleArticleClick}>
                    Fetch
                  </Button>
                </Box>
                {article && <Box>id1: {article.title}</Box>}
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
};

export default App;
