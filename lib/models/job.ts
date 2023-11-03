export interface Job {
    id: string;
    payee: string;
    blockTimestamp: string;
    blockNumber: string;
    module: string;
    calling_contract: string;
    inputs: string[];
  }
  