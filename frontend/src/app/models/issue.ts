export interface Issue {
  id: number;
  title: string;
  description: string;
  status: IssueStatus;
  priority: IssuePriority;
}

export type IssueStatus = 'TODO' | 'IN_PROGRESS' | 'DONE';

export type IssuePriority = 'LOW' | 'MEDIUM' | 'HIGH';