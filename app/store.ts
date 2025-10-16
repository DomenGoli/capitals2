import { configureStore } from "@reduxjs/toolkit";
import settingsReducer from "@/app/_slices/settingsSlice";
import gameReducer from "@/app/_slices/gameSlice";
import dataReducer from "@/app/_slices/dataSlice"

const store = configureStore({
    reducer: {
        settings: settingsReducer,
        game: gameReducer,
        data: dataReducer,
    },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
