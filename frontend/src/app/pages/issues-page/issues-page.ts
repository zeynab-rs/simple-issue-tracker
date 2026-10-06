import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Issue, IssuePriority, IssueStatus } from '../../models/issue';
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

  onStatusFilterChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;

    this.statusFilter.set(value as IssueStatus | 'ALL');
  }

  onPriorityFilterChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;

    this.priorityFilter.set(value as IssuePriority | 'ALL');
  }
}