import React, { useCallback } from 'react';
import { Box, Button, Card, CardContent, Stack } from '@mui/material';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useAppDispatch, useAppSelector, useFetch } from '../state/hooks';
import {
  userDataNotReady,
  fetchUsers,
  getUserDataStatus,
  getUser,
  getUsers,
  postUser,
} from '../state/ducks/user/slices';
import {
  articleDataNotReady,
  fetchArticles,
  getArticleDataStatus,
  getArticles,
} from '../state/ducks/article/slices';
import { RootState } from '../state/store';
import AppRouterLayout from './AppRouterLayout';

const App: React.VFC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="cra-app" />} />
        <Route path="cra-app" element={<AppRouterLayout />}>
          <Route index element={<Navigate to="dashbord" />} />
          <Route path="dashbord" element={<SampleComponent />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

const SampleComponent: React.VFC = () => {
  const userDataStatus = useAppSelector(getUserDataStatus);
  const users = useAppSelector(getUsers);
  const user = useAppSelector((state: RootState) => getUser(state, 1));
  useFetch(userDataStatus, userDataNotReady, fetchUsers());

  const articleDataStatus = useAppSelector(getArticleDataStatus);
  const articles = useAppSelector(getArticles);
  useFetch(articleDataStatus, articleDataNotReady, fetchArticles());

  const dispatch = useAppDispatch();
  const hadleUsersPostClick = useCallback(() => {
    dispatch(postUser('posted1'));
  }, [dispatch]);

  return (
    <Box>
      <Stack spacing={1}>
        <Card>
          <CardContent>
            <Stack direction="column" spacing={1}>
              <Box>
                <Box>Users</Box>
                <Box>
                  <Button variant="outlined" onClick={hadleUsersPostClick}>
                    Post
                  </Button>
                </Box>
                {users.map((user) => (
                  <Box key={user.id}>{user.name}</Box>
                ))}
              </Box>
              <Box>
                <Box>User</Box>
                <Box></Box>
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
                {articles.map((article) => (
                  <Box key={article.id}>
                    {article.title} {article.author.name}
                  </Box>
                ))}
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
};

export default App;
