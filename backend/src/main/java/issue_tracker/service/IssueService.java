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

        Issue issue1 = new Issue(1);

        issue1.setTitle("Fix login button");
        issue1.setDescription("Login button doesn't work on mobile");
        issue1.setStatus(IssueStatus.IN_PROGRESS);
        issue1.setPriority(IssuePriority.HIGH);

        issues.add(issue1);

        Issue issue2 = new Issue(2);

        issue2.setTitle("Update README");
        issue2.setDescription("Add installation instruction");
        issue2.setStatus(IssueStatus.TODO);
        issue2.setPriority(IssuePriority.MEDIUM);

        issues.add(issue2);

        Issue issue3 = new Issue(3);

        issue3.setTitle("Create mobile layout");
        issue3.setDescription("Improve responsive design");
        issue3.setStatus(IssueStatus.DONE);
        issue3.setPriority(IssuePriority.LOW);

        issues.add(issue3);

        return issues;
    }
}
