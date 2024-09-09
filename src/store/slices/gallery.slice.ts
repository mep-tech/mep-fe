import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { GalleryType } from "../../types/gallery.type";
import axiosInstance from "../../axios";
import { PaginationType } from "../../types/pagination.type";

const galleryAdapter = createEntityAdapter<GalleryType, string>({
	selectId: (gallery: any) => gallery._id,
	sortComparer: (a, b) => a.createdAt.localeCompare(b.createdAt),
})

export const getAllGalleries = createAsyncThunk("gallery/getAllGalleries", async (pagination?: PaginationType) => {
	const gallery = await axiosInstance.get(`/gallery`, { params: pagination })
	return gallery.data
})

export const getAllProjectGalleries = createAsyncThunk("gallery/getAllProjectGalleries", async ({ projectId, skip, limit }: { projectId: string, skip?: PaginationType['skip'], limit?: PaginationType['limit'] }) => {
	const galleries = await axiosInstance.get(`/project/${projectId}/gallery`, { params: { skip, limit } })
	return {
		...galleries.data,
		data: galleries.data.data.map((activity: any) => ({ ...activity, project: projectId }))
	}
})

export const { selectAll: selectAllGalleries, selectById: selectGalleryById } = galleryAdapter.getSelectors<RootState>((state) => state.gallery)

const gallerySlice = createSlice({
	name: "gallery",
	initialState: galleryAdapter.getInitialState(),
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getAllGalleries.fulfilled, (state, action) => {
			galleryAdapter.upsertMany(state, action.payload.data)
		})
		builder.addCase(getAllProjectGalleries.fulfilled, (state, action) => {
			galleryAdapter.upsertMany(state, action.payload.data)
		})
	}
})

export const selectAllProjectGalleries = (id: string) => (state: RootState) => {
	return selectAllGalleries(state).filter((gallery) => gallery.project === id)
}

export default gallerySlice;