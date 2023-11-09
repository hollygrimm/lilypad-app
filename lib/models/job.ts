export interface Job {
    id: string;
    createdAtTimestamp: number;
    lastModifiedTimestamp: number;
    durationSeconds: number;
    state: string;
    history: History[];
  }

  export interface History {
    id: string;
    timestamp: number;
    payee: string;
    amount: number;
    reason: string;
    direction: string;
    state: string;
  }
  