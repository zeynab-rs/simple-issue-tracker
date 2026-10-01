package issue_tracker.controller;

import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import issue_tracker.model.Issue;
import issue_tracker.service.IssueService;

@RestController
public class IssueController {

    private IssueService issueService;

    public IssueController(IssueService issueService) {
        this.issueService = issueService;
    }

    @GetMapping("/api/issues")
    public List<Issue> issues() {
        return issueService.getAllIssues();
    }

    @PostMapping("/api/issues")
    public ResponseEntity<Issue> createIssue(@RequestBody Issue issue) {
        Issue newIssue = issueService.createIssue(issue);

        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(newIssue);
    }

    @GetMapping("/api/issues/{id}")
    public ResponseEntity<Issue> issue(@PathVariable Integer id) {
        Issue issue = issueService.findById(id);

        if (issue != null) {
            return ResponseEntity
                .status(HttpStatus.OK)
                .body(issue);
        } else {
            return ResponseEntity
                .notFound()
                .build();
        }    
    }

    @PutMapping("/api/issues/{id}")
    public ResponseEntity<Issue> editIssue(@RequestBody Issue issue, @PathVariable Integer id) {
        Issue newIssue = issueService.editIssue(issue, id);
        
        if (newIssue != null) {
            return ResponseEntity
                .status(HttpStatus.OK)
                .body(newIssue);
        } else {
            return ResponseEntity
                .notFound()
                .build();
        }
    }

    @DeleteMapping("/api/issues/{id}")
    public Issue deleteIssue(@PathVariable Integer id) {
        return issueService.deleteIssue(id);
    }
}
