import { Component, input, computed } from '@angular/core';
import { Issue } from '../../models/issue';

@Component({
  selector: 'app-issue-card',
  templateUrl: './issue-card.html',
  styleUrl: './issue-card.css',
})
export class IssueCard {
  issue = input.required<Issue>();

  statusLabel = computed(() => {
    switch (this.issue().status) {
      case 'TODO':
        return 'To Do';

      case 'IN_PROGRESS':
        return 'In Progress';

      case 'DONE':
        return 'Done';
    }
  });
}