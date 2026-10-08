import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateIssue } from '../../components/create-issue/create-issue';
import { IssueService } from '../../services/issue.service';
import { Issue } from '../../models/issue';

@Component({
    selector: 'app-issue-form-page',
    imports: [CreateIssue],
    templateUrl: './issue-form-page.html',
})
export class IssueFormPage {
    issue = signal<Issue | null>(null);

    constructor(
        private route: ActivatedRoute,
        private issueService: IssueService,
        private router: Router
    ) {
        const id = this.route.snapshot.paramMap.get('id');

        if (id) {
            const issueId = Number(id);

            if (Number.isNaN(issueId)) {
                return;
            }

            this.issueService.getIssue(issueId).subscribe({
                next: (issue) => {
                    this.issue.set(issue);
                },
                error: (error) => {
                    console.error('Failed to load issue:', error);
                },
            });
        }
    }

    onIssueCreated() {
        this.router.navigate(['/issues']);
    }

    onIssueUpdated() {
        this.router.navigate(['/issues']);
    }
}