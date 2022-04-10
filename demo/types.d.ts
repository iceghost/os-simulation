export interface OutputParseResult {
  schedule: Timeslot[];
}

export interface InputParseResult {
  slotTime: number;
  numCPUs: number;
  numProcesses: number;
  processes: { arrival: number; name: string }[];
}

export interface Event {
  event: string;
  cpu?: number;
  pid?: number;
}

export interface Timeslot {
  timeslot: number;
  events: Event[];
}

export interface Page {
  page: number;
  from: string;
  to: string;
  pid: number;
  idx: number;
  nxt: number;
  bytes: Byte[];
}

export interface Byte {
  address: number;
  value: number;
}

export interface CPU {
  id: number;
  current: number | null;
  history: (number | null)[];
}
