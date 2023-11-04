// services/jobService.js
import { Job } from "@/lib/models/job";

const jobsGql = `
{
  jobs {
    id
    dealId
    createdAtTimestamp
    state
    history {
      id
      timestamp
      state
    }
  }
}
`;
1
const graphURL = "https://api.studio.thegraph.com/proxy/57464/lilypad-sepolia/v0.0.6";

const fetchJobsFromApi = async () => {
    const response = await fetch(graphURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: jobsGql,
      }),
    });
  
    if (!response.ok) {
      throw new Error('Error fetching jobs');
    }
  
    const jsonResponse = await response.json();
    const jobs: Job[] = jsonResponse.data.jobs.map((job: any) => ({
        ...job,
        createdAtTimestamp: parseInt(job.createdAtTimestamp, 10),
        history: job.history.map((historyEntry: any) => ({
          ...historyEntry,
          timestamp: parseInt(historyEntry.timestamp, 10), 
        })),
      }));
  
    return jobs;
  };
  
  export default {
    fetchJobsFromApi,
  };