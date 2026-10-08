import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Issue, IssuePriority, IssueStatus } from '../../models/issue';
import { IssueCard } from '../../components/issue-card/issue-card';
import { DeleteConfirmation } from '../../components/delete-confirmation/delete-confirmation';
import { IssueService } from '../../services/issue.service';

@Component({
  imports: [IssueCard, DeleteConfirmation, RouterLink],
  selector: 'app-issues-page',
  templateUrl: './issues-page.html',
  styleUrl: './issues-page.css',
})
export class IssuesPage {
  issues = signal<Issue[]>([]);
  isLoading = signal(true);
  errorMessage = signal('');
  statusFilter = signal<IssueStatus | 'ALL'>('ALL');
  priorityFilter = signal<IssuePriority | 'ALL'>('ALL');
  filteredIssues = computed(() => {
    const status = this.statusFilter();
    const priority = this.priorityFilter();

    return this.issues().filter((issue) => {
      const matchesStatus =
        status === 'ALL' || issue.status === status;

      const matchesPriority =
        priority === 'ALL' || issue.priority === priority;

      return matchesStatus && matchesPriority;
    });
  });
  issueToDelete = signal<Issue | null>(null);

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
    const issueToDelete = this.issues().find(issue => issue.id === id);
    this.issueToDelete.set(issueToDelete ?? null);
  }

  onConfirmedDelete() {
    if (!this.issueToDelete()) {
      return;
    }

    const issueToDeleteId = this.issueToDelete()!.id;

    this.issueService.deleteIssue(issueToDeleteId).subscribe({
      next: () => {
        this.issueToDelete.set(null);
        this.issues.update((issues) =>
          issues.filter((currentIssue) => currentIssue.id !== issueToDeleteId)
        );
      },

      error: (error) => {
        console.error('Failed to delete issue:', error);
        this.errorMessage.set('Failed to delete issue.');
      },
    });
  }

  onCancelledDelete() {
    this.issueToDelete.set(null);
  }

  onStatusFilterChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;

    this.statusFilter.set(value as IssueStatus | 'ALL');
  }

  onPriorityFilterChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;

    this.priorityFilter.set(value as IssuePriority | 'ALL');
  }
}