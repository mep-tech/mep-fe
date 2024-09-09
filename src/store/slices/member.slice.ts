import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "../store";
import axiosInstance from "../../axios";
import { PaginationType } from "../../types/pagination.type";

const memberAdapter = createEntityAdapter({
  selectId: (member: any) => member._id,
});

export const getAllMembers = createAsyncThunk(
  "member/getAllMembers",
  async (pagination: PaginationType) => {
    const response = await axiosInstance.get("/member", { params: pagination });
    return response.data;
  }
);

export const { selectAll: selectAllMembers, selectById: selectMemberById } =
  memberAdapter.getSelectors<RootState>((state) => state.member);

const memberSlice = createSlice({
  name: "member",
  initialState: memberAdapter.getInitialState(),
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAllMembers.fulfilled, (state, action) => {
      memberAdapter.upsertMany(state, action.payload.data);
    });
  },
});

export default memberSlice;
