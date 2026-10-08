import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Issue } from '../models/issue';

@Injectable({
    providedIn: 'root',
})
export class IssueService {
    constructor(private http: HttpClient) {}

    getIssues() {
        return this.http.get<Issue[]>('/api/issues');
    }

    createIssue(issue: Omit<Issue, 'id'>) {
        return this.http.post<Issue>('/api/issues', issue);
    }

    updateIssue(issue: Issue) {
        return this.http.put<Issue>(`/api/issues/${issue.id}`, issue);
    }

    deleteIssue(id: number) {
        return this.http.delete<void>(`/api/issues/${id}`);
    }

    getIssue(id: number) {
        return this.http.get<Issue>(`/api/issues/${id}`);
    }
}