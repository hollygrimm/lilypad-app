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
import React from "react";

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
          <p>Deal ID: {job.dealId}</p>
          <p>createdAtTimestamp: {new Date(job.createdAtTimestamp * 1000).toLocaleString()}</p>
          <p>State: {job.state}</p>
          {job.history.map((history, index) => (
            <React.Fragment key={index}>
              <p>State: {history.state}</p>
              <p>Timestamp: {new Date(history.timestamp * 1000).toLocaleString()}</p>
            </React.Fragment>
          ))}
        </div>
      ))}
    </div>
  );
};
