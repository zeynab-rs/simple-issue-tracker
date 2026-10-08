import { Component, input, output } from '@angular/core';
import { Issue } from '../../models/issue';

@Component({
  imports: [],
  selector: 'app-delete-confirmation',
  styleUrl: './delete-confirmation.css',
  templateUrl: './delete-confirmation.html',
})
export class DeleteConfirmation {
  issue = input.required<Issue>();
  confirmedClicked = output<void>();
  cancelledClicked = output<void>();
}
