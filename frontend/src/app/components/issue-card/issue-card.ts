import { Component, input, computed, output } from '@angular/core';
import { Issue } from '../../models/issue';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-issue-card',
  imports: [RouterLink],
  templateUrl: './issue-card.html',
  styleUrl: './issue-card.css',
})
export class IssueCard {
  issue = input.required<Issue>();
  deleteClicked = output<number>();

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

  onDelete() {
    this.deleteClicked.emit(this.issue().id);
  }
}