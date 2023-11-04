export interface Job {
    id: string;
    dealId: string;
    createdAtTimestamp: number;
    state: string;
    history: History[];
  }

  export interface History {
    id: string;
    timestamp: number;
    state: string;
  }
  