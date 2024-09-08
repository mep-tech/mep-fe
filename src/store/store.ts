import { configureStore } from "@reduxjs/toolkit";
import projectSlice from "./slices/project.slice";
import test from "node:test";
import testimonialSlice from "./slices/testimonial.slice";

export const store = configureStore({
  reducer: {
    project: projectSlice.reducer,
    testimonial: testimonialSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
