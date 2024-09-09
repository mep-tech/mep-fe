import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import activitySlice from "./slices/activity.slice";
import gallerySlice from "./slices/gallery.slice";
import projectSlice from "./slices/project.slice";
import testimonialSlice from "./slices/testimonial.slice";

const logger = createLogger({
	collapsed: true,
	timestamp: true,
})

export const store = configureStore({
	reducer: {
		project: projectSlice.reducer,
		testimonial: testimonialSlice.reducer,
		activity: activitySlice.reducer,
		gallery: gallerySlice.reducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
