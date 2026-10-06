import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Issue } from '../../models/issue';
import { IssueCard } from '../../components/issue-card/issue-card';
import { IssueService } from '../../services/issue.service';

@Component({
  imports: [IssueCard, RouterLink],
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

  onDeleteIssue(id: number) {
    this.issueService.deleteIssue(id).subscribe({
      next: () => {
        this.issues.update((issues) =>
          issues.filter((currentIssue) => currentIssue.id !== id)
        );
      },

      error: (error) => {
        console.error('Failed to delete issue:', error);
        this.errorMessage.set('Failed to delete issue.');
      },
    });
  }
}