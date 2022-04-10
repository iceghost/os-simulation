export interface ParseResult {
  schedule: Timeslot[];
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
