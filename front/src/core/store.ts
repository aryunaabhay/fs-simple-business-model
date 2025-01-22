// filepath: /path/to/your/store.ts
import { configureStore } from '@reduxjs/toolkit'
import businessModelDetailReducer from '../app/business_model/businessModelDetailSlice'

export const store = configureStore({
    reducer: {
        businessModelDetail: businessModelDetailReducer,
    },
  })

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch