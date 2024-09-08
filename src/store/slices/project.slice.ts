import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axios";
import { PaginationType } from "../../types/pagination.type";
import { RootState } from "../store";

const projectAdapter = createEntityAdapter({
	selectId: (project: any) => project._id,
});

export const getAllProjects = createAsyncThunk("project/getAllProjects", async (pagination?: PaginationType) => {
	const response = await axiosInstance.get("/project", { params: pagination });
	return response.data;
});

export const { selectAll: selectAllProjects, selectById: selectProjectById } = projectAdapter.getSelectors<RootState>(
	(state) => state.project
);

const projectSlice = createSlice({
	name: "project",
	initialState: projectAdapter.getInitialState(),
	reducers: {},
	extraReducers (builder) {
		builder.addCase(getAllProjects.fulfilled, (state, action) => {
			projectAdapter.upsertMany(state, action.payload.data);
		});
	},
});

export default projectSlice;
