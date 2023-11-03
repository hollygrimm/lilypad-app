// services/jobService.js
import { Job } from "@/lib/models/job";

const jobAddedsGql = `
{
  jobAddeds {
    id,
    payee,
    blockTimestamp,
    blockNumber,
    module,
    calling_contract,
    inputs,
  }
}
`;
1
const graphURL = "https://api.studio.thegraph.com/proxy/57464/lilypad-sepolia/v0.0.2";

const fetchJobsFromApi = async () => {
    const response = await fetch(graphURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: jobAddedsGql,
      }),
    });
  
    if (!response.ok) {
      throw new Error('Error fetching jobs');
    }
  
    const jsonResponse = await response.json();
    const jobs: Job[] = jsonResponse.data.jobAddeds.map((job: any) => ({
        ...job,
        blockTimestamp: parseInt(job.blockTimestamp, 10), // converting to number if needed
        blockNumber: parseInt(job.blockNumber, 10), // converting to number if needed
      }));
  
    return jobs;
  };
  
  export default {
    fetchJobsFromApi,
  };