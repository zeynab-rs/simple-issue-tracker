package issue_tracker.service;

import issue_tracker.model.Issue;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class IssueService {
    private List<Issue> issues = new ArrayList<>();
    private int nextId = 1;

    public Issue createIssue(Issue issue) {
        Issue newIssue = new Issue(this.nextId);
        newIssue.setTitle(issue.getTitle());
        newIssue.setDescription(issue.getDescription());
        newIssue.setStatus(issue.getStatus());
        newIssue.setPriority(issue.getPriority());
        issues.add(newIssue);
        this.nextId++;

        return newIssue;
    }

    public List<Issue> getAllIssues() {
        return this.issues;
    }
}
