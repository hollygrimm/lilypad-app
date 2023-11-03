/* Core */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

/* Instruments */
import { fetchJobs } from './thunks'

import { Job } from '@/lib/models/job'

const initialState: JobsSliceState = {
  //empty list of jobs
  list: [],
  loading: false,
  error: null,
}

export const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    jobsRequested: (state) => {
      state.loading = true;
    },
    jobsFetched: (state, action) => {
      state.list = action.payload;
      state.loading = false;
    },
    jobsRequestFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false
        state.list = action.payload
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message ?? null
      })
  },
})

/* Types */
export interface JobsSliceState {
  list: Job[],
  loading: boolean,
  error: string | null,
}
