import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "../store";
import axiosInstance from "../../axios";
import { PaginationType } from "../../types/pagination.type";

const certificateAdapter = createEntityAdapter({
  selectId: (certificate: any) => certificate._id,
});

export const getAllCertificates = createAsyncThunk(
  "certificate/getAllCertificates",
  async (pagination: PaginationType) => {
    const response = await axiosInstance.get("/certificate", {
      params: pagination,
    });
    return response.data;
  }
);

export const {
  selectAll: selectAllCertificates,
  selectById: selectCertificateById,
} = certificateAdapter.getSelectors<RootState>((state) => state.certificate);

const certificateSlice = createSlice({
  name: "certificate",
  initialState: certificateAdapter.getInitialState(),
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAllCertificates.fulfilled, (state, action) => {
      certificateAdapter.upsertMany(state, action.payload.data);
    });
  },
});

export default certificateSlice;
