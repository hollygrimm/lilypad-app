"use client";

/* Core */
import { useEffect } from "react";
import { BrowserProvider } from "ethers";
import { Contract } from "ethers";

/* Instruments */
import {
  useSelector,
  useDispatch,
  fetchJobs,
} from "@/lib/redux";
import { CONTRACTS } from "@/lib/config/contracts";
import styles from "./jobs.module.css";
import React from "react";

const getStateColor = (state: string) => {
  switch (state) {
    case 'DealAgreed':
      return 'text-orange-500';
    case 'ResultsSubmitted':
      return 'text-blue-500';
    case 'ResultsChecked':
      return 'text-green-500';
    case 'ResultsAccepted':
      return 'text-green-500';
    case 'MediationRejected':
      return 'text-red-500';
    default:
      return 'text-gray-500';
  }
};

export const Jobs = () => {
  const dispatch = useDispatch();
  const { list: jobs, loading, error } = useSelector((state) => state.jobs);

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  useEffect(() => {
    const setupEventListeners = async () => {
      try {
        // Connect to the Ethereum network using ethers v6 syntax
        const provider = new BrowserProvider(window.ethereum)
        
        // Create contract instances
        const storageContract = new Contract(
          CONTRACTS.STORAGE.address,
          CONTRACTS.STORAGE.abi,
          provider
        )

        const paymentsContract = new Contract(
          CONTRACTS.PAYMENTS.address,
          CONTRACTS.PAYMENTS.abi,
          provider
        )

        // Storage contract events
        storageContract.on('DealStateChange', (dealId, state, ...args) => {
          console.log('Deal state changed:', { dealId, state, args })
          dispatch(fetchJobs())
        })

        // Payments contract events
        paymentsContract.on('Payment', (dealId, payee, amount, reason, direction, ...args) => {
          console.log('Payment processed:', { dealId, payee, amount, reason, direction, args })
          dispatch(fetchJobs())
        })

        // Cleanup function
        return () => {
          storageContract.removeAllListeners()
          paymentsContract.removeAllListeners()
        }
      } catch (error) {
        console.error('Error setting up event listeners:', error)
      }
    }

    setupEventListeners()
  }, [dispatch]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      {jobs.map((job) => (
        <div key={job.id} className="p-4 m-2 border border-gray-200 rounded-lg shadow">
          <p className="font-semibold text-lg">Deal ID: {job.id}</p>
          <p>Created: <span className="font-medium">{new Date(job.createdAtTimestamp * 1000).toLocaleString()}</span></p>
          <p>Last Modified: <span className="font-medium">{new Date(job.lastModifiedTimestamp * 1000).toLocaleString()}</span></p>
          <p>Duration: <span className="font-medium">{job.durationSeconds} seconds</span></p>
          <p>State: <span className={`font-medium ${getStateColor(job.state)}`}>{job.state}</span></p>
          <div className="mt-4">
            <p className="font-semibold text-lg mb-2">History</p>
            <div className="ml-4">
              {job.history.map((history, index) => (
                <div key={index} className="mb-2 p-2 bg-gray-100 rounded-md">
                  <p>State: <span className={`font-medium ${getStateColor(history.state)}`}>{history.state}</span></p>
                  <p>Payee: <span className="font-medium">{history.payee}</span></p>
                  <p>Amount: <span className="font-medium">{history.amount}</span></p>
                  <p>Reason: <span className="font-medium">{history.reason}</span></p>
                  <p>Direction: <span className="font-medium">{history.direction}</span></p>
                  <p>Timestamp: <span className="font-medium">{new Date(history.timestamp * 1000).toLocaleString()}</span></p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
