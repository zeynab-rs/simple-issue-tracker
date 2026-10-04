import { Component, signal } from '@angular/core';
import { Issue } from '../../models/issue';
import { IssueCard } from '../../components/issue-card/issue-card';
import { IssueService } from '../../services/issue.service';
import { CreateIssue } from '../../components/create-issue/create-issue';

@Component({
  imports: [IssueCard, CreateIssue],
  selector: 'app-issues-page',
  templateUrl: './issues-page.html',
  styleUrl: './issues-page.css',
})
export class IssuesPage {
  issues = signal<Issue[]>([]);
  isLoading = signal(true);
  errorMessage = signal('');

  constructor(private issueService: IssueService) {
    this.issueService.getIssues().subscribe({
      next: (issues) => {
        this.issues.set(issues);
        this.isLoading.set(false);
      },

      error: () => {
        this.errorMessage.set('Failed to load issues.');
        this.isLoading.set(false);
      },
    });
  }

  onIssueCreated(issue: Issue) {
    this.issues.update((issues) => [...issues, issue]);
  }
}