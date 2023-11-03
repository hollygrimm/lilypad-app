"use client";

/* Core */
import { useEffect } from "react";

/* Instruments */
import {
  useSelector,
  useDispatch,
  fetchJobs,
} from "@/lib/redux";
import styles from "./jobs.module.css";

export const Jobs = () => {
  const dispatch = useDispatch();
  const { list: jobs, loading, error } = useSelector((state) => state.jobs);

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      {jobs.map((job) => (
        <div key={job.id} className="p-2 m-2 border">
          <p>Deal ID: {job.id}</p>
          <p>payee: {job.payee}</p>
          <p>blockTimestamp: {job.blockTimestamp}</p>
          <p>blockNumber: {job.blockNumber}</p>
          <p>module: {job.module}</p>
          <p>calling_contract: {job.calling_contract}</p>
          <p>inputs: {job.inputs}</p>
        </div>
      ))}
    </div>
  );
};
