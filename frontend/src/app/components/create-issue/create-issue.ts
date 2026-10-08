import { Component, input, output, signal, effect } from '@angular/core';
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
})
export class CreateIssue {
    editingIssue = input<Issue | null>(null);
    issueCreated = output<Issue>();
    issueUpdated = output<Issue>();
    isSubmitting = signal(false);
    errorMessage = signal('');
    issueForm = new FormGroup({
        title: new FormControl('', {
            nonNullable: true,
            validators: [
                Validators.required,
                Validators.minLength(3)
            ]
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
        effect(() => {
            const issue = this.editingIssue();

            if (issue) {
                this.issueForm.reset({
                    title: issue.title,
                    description: issue.description,
                    status: issue.status,
                    priority: issue.priority,
                });
            }
        });
    }

    onSubmit() {
        if (this.issueForm.invalid) {
            this.issueForm.markAllAsTouched();
            return;
        }

        this.errorMessage.set('');
        this.isSubmitting.set(true);

        const issue = this.issueForm.getRawValue();
        const editingIssue = this.editingIssue();

        if (editingIssue) {
            const updatedIssue: Issue = {
                id: editingIssue.id,
                ...issue,
            };

            this.issueService.updateIssue(updatedIssue).subscribe({
                next: (updatedIssue) => {
                    this.issueUpdated.emit(updatedIssue);
                    this.resetForm();
                    this.isSubmitting.set(false);
                },

                error: (error) => {
                    console.error('Failed to update issue:', error);
                    this.errorMessage.set('Failed to update issue.');
                    this.isSubmitting.set(false);
                },
            });
        } else {
            this.issueService.createIssue(issue).subscribe({
                next: (createdIssue) => {
                    this.issueCreated.emit(createdIssue);
                    this.resetForm();
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

    private resetForm() {
        this.issueForm.reset({
            title: '',
            description: '',
            status: 'TODO',
            priority: 'MEDIUM',
        });
    }
}