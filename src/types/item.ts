export interface Item {
  id: number | string;
  name: string;
  discoveredIssues: number;
  childrenIssues?: number;
  children?: Item[];
}
