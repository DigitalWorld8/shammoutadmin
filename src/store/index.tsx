import { combineReducers, configureStore } from '@reduxjs/toolkit';
import themeConfigSlice from './themeConfigSlice';
import authSlice from './slices/authSlice';
import usersSlice from './slices/usersSlice';
import pagesSlice from './slices/pagesSlice';
import galleriesSlice from './slices/galleriesSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const rootReducer = combineReducers({
  themeConfig: themeConfigSlice,
  auth: authSlice,
  users: usersSlice,
  pages: pagesSlice,
  gallery: galleriesSlice
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);

// Debugging
persistor.subscribe(() => {
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type IRootState = ReturnType<typeof rootReducer>; export const useAppDispatch: () => AppDispatch = useDispatch; // ✅ Add this line
