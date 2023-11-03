/* Instruments */
import { createAppAsyncThunk } from "@/lib/redux/createAppAsyncThunk";
import { jobsSlice } from "./jobsSlice";
import type { ReduxThunkAction } from "@/lib/redux";
import { Job } from "@/lib/models/job";
import jobService from "@/lib/services/jobService";

export const fetchJobs = createAppAsyncThunk(
  "jobs/fetchJobs",
  async () => {
    try {
      const jobs = await jobService.fetchJobsFromApi();
      console.log("jobs", jobs);
      // return jobs;
      return jobs;
    } catch (error) {
      throw new Error((error as Error).message ?? "error fetching jobs");
    }
  }
);
