import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axiosInstance from "../../axios";
import { PaginationType } from "../../types/pagination.type";

const testimonialAdapter = createEntityAdapter({
  selectId: (testimonial: any) => testimonial._id,
});

export const getAllTestimonials = createAsyncThunk("testimonial/getAllTestimonials", async (pagination: PaginationType) => {
  const response = await axiosInstance.get("/testimonial", { params: pagination });
  return response.data;
});

export const { selectAll: selectAllTestimonials, selectById: selectTestimonialById } = testimonialAdapter.getSelectors<RootState>(
  (state) => state.testimonial
);

const testimonialSlice = createSlice({
  name: "testimonial",
  initialState: testimonialAdapter.getInitialState(),
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAllTestimonials.fulfilled, (state, action) => {
      testimonialAdapter.upsertMany(state, action.payload.data);
    });
  },
});

export default testimonialSlice;
