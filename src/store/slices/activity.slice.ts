import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axiosInstance from "../../axios";
import { PaginationType } from "../../types/pagination.type";

const activityAdapter = createEntityAdapter({
	selectId: (activity: any) => activity._id,
	sortComparer: (a, b) => a.createdAt.localeCompare(b.createdAt),
})


export const getAllActivities = createAsyncThunk("activity/getAllActivities", async (pagination?: PaginationType) => {
	const activities = await axiosInstance.get(`/activity`, { params: pagination })
	return activities.data
})

export const getAllProjectActivities = createAsyncThunk("activity/getAllProjectActivities", async ({ projectId, skip, limit }: { projectId: string, skip?: PaginationType['skip'], limit?: PaginationType['limit'] }) => {
	const activities = await axiosInstance.get(`/project/${projectId}/activities`, { params: { skip, limit } })
	return {
		...activities.data,
		data: activities.data.data.map((activity: any) => ({ ...activity, project: projectId }))
	}
})


export const { selectAll: selectAllActivities, selectById: selectActivityById } = activityAdapter.getSelectors<RootState>((state) => state.activity)

const activitySlice = createSlice({
	name: "activity",
	initialState: activityAdapter.getInitialState(),
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getAllProjectActivities.fulfilled, (state, action) => {
			activityAdapter.upsertMany(state, action.payload.data)
		})
		builder.addCase(getAllActivities.fulfilled, (state, action) => {
			activityAdapter.upsertMany(state, action.payload.data)
		})
	}
})

export const selectAllProjectActivity = (id: string) => (state: RootState) => {
	return selectAllActivities(state).filter((activity) => activity.project === id)
}

export default activitySlice;