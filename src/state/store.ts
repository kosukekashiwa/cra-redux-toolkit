import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from './ducks/user/slices';
import articlereducer from './ducks/article/slices';

export const store = configureStore({
  reducer: {
    user: userReducer,
    article: articlereducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
