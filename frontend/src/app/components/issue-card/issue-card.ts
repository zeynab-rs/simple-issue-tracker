import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Issue } from '../../models/issue';

@Component({
  selector: 'app-issue-card',
  imports: [RouterLink],
  templateUrl: './issue-card.html',
})
export class IssueCard {
  issue = input.required<Issue>();
  deleteClicked = output<number>();

  onDelete() {
    this.deleteClicked.emit(this.issue().id);
  }
}