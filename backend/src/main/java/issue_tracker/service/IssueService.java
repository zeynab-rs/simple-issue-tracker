package issue_tracker.service;

import issue_tracker.model.Issue;
import issue_tracker.model.IssuePriority;
import issue_tracker.model.IssueStatus;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

@Service 
public class IssueService {
    public List<Issue> getAllIssues() {
        List<Issue> issues = new ArrayList<>();

        Issue issue1 = new Issue();

        issue1.id = 1;
        issue1.title = "Fix login button";
        issue1.description = "Login button doesn't work on mobile";
        issue1.status = IssueStatus.IN_PROGRESS;
        issue1.priority = IssuePriority.HIGH;

        issues.add(issue1);

        Issue issue2 = new Issue();

        issue2.id = 2;
        issue2.title = "Update README";
        issue2.description = "Add installation instruction";
        issue2.status = IssueStatus.TODO;
        issue2.priority = IssuePriority.MEDIUM;

        issues.add(issue2);

        Issue issue3 = new Issue();

        issue3.id = 3;
        issue3.title = "Create mobile layout";
        issue3.description = "Improve responsive design";
        issue3.status = IssueStatus.DONE;
        issue3.priority = IssuePriority.LOW;

        issues.add(issue3);

        return issues;
    }
}
