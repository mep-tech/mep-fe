import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axios";
import { PaginationType } from "../../types/pagination.type";
import { ProjectType } from "../../types/project.type";
import { RootState } from "../store";

const projectAdapter = createEntityAdapter<ProjectType, string>({
	selectId: (project: any) => project._id,
	sortComparer: (a, b) => a.createdAt.localeCompare(b.createdAt),
});

export const getAllProjects = createAsyncThunk("project/getAllProjects", async (pagination?: PaginationType) => {
	const response = await axiosInstance.get("/project", { params: pagination });
	return response.data;
});

export const getProject = createAsyncThunk("project/getProject", async ({ projectId }: { projectId: string }) => {
	const response = await axiosInstance.get(`/project/${projectId}`);
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
		builder.addCase(getProject.fulfilled, (state, action) => {
			projectAdapter.upsertOne(state, action.payload.data);
		});
	},
});

export default projectSlice;
