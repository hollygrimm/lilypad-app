export interface Job {
    id: string;
    dealId: string;
    createdAtTimestamp: number;
    lastModifiedTimestamp: number;
    durationSeconds: number;
    state: string;
    history: History[];
  }

  export interface History {
    id: string;
    timestamp: number;
    state: string;
  }
  