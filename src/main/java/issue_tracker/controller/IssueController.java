package issue_tracker.controller;

import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;

import issue_tracker.model.Issue;
import issue_tracker.service.IssueService;

@RestController
public class IssueController {

    private IssueService issueService;

    public IssueController(IssueService issueService) {
        this.issueService = issueService;
    }

    @GetMapping("/api/issues")
    public List<Issue> issue() {
        return issueService.getAllIssues();
    }
}
