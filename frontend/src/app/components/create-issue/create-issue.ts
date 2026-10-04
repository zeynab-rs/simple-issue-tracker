import { Component, output, signal } from '@angular/core';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators
} from '@angular/forms';
import { IssueService } from '../../services/issue.service';
import { Issue, IssuePriority, IssueStatus } from '../../models/issue';

@Component({
    selector: 'app-create-issue',
    imports: [ReactiveFormsModule],
    templateUrl: './create-issue.html',
    styleUrl: './create-issue.css',
})
export class CreateIssue {
    issueCreated = output<Issue>();
    isSubmitting = signal(false);
    errorMessage = signal('');
    issueForm = new FormGroup({
        title: new FormControl('', {
            nonNullable: true,
            validators: Validators.required
        }
        ),
        description: new FormControl('', {
            nonNullable: true,
            validators: Validators.required
        }),
        status: new FormControl<IssueStatus>('TODO', {
            nonNullable: true
        }),
        priority: new FormControl<IssuePriority>('MEDIUM', {
            nonNullable: true
        }),
    });

    constructor(private issueService: IssueService) {

    }

    onSubmit() {
        if (this.issueForm.invalid) {
            this.issueForm.markAllAsTouched();
            return;
        }

        this.errorMessage.set('');
        this.isSubmitting.set(true);

        const issue = this.issueForm.getRawValue();

        this.issueService.createIssue(issue).subscribe({
            next: (createdIssue) => {
                this.issueCreated.emit(createdIssue);

                this.issueForm.reset({
                    title: '',
                    description: '',
                    status: 'TODO',
                    priority: 'MEDIUM',
                });

                this.isSubmitting.set(false);
            },

            error: (error) => {
                console.error('Failed to create issue:', error);
                this.errorMessage.set('Failed to create issue.');
                this.isSubmitting.set(false);
            },
        });
    }
}