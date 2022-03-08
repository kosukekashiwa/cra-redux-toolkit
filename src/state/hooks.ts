import { ActionCreatorWithoutPayload, ThunkAction } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type FetchStatus = 'idle' | 'loading' | 'success' | 'failed';
export const useFetch = (
  dataStatus: FetchStatus,
  dataNotReadyAction: ActionCreatorWithoutPayload<string>,
  // eslint-disable-next-line
  fetchAction: ThunkAction<any, any, any, any>,
): void => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(dataNotReadyAction);
  }, []);
  useEffect(() => {
    if (dataStatus === 'idle') {
      dispatch(fetchAction);
    }
  }, [dataStatus, dispatch, fetchAction]);
};
