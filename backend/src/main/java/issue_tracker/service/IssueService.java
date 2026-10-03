package issue_tracker.service;

import issue_tracker.repository.IssueRepository;

import issue_tracker.model.Issue;

import java.util.List;

import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;

@Service
public class IssueService {
    private final IssueRepository issueRepository;

    public IssueService(IssueRepository issueRepository) {
        this.issueRepository = issueRepository;
    }

    public Issue createIssue(Issue issue) {
        return issueRepository.save(issue);
    }

    public List<Issue> getAllIssues() {
        return issueRepository.findAll();
    }

    public Issue findById(Integer id) {
        return issueRepository.findById(id).orElse(null);
    }

    @Transactional
    public Issue editIssue(Issue newIssue, Integer id) {
        Issue issue = this.findById(id);
        
        if (issue != null) {
            issue.setTitle(newIssue.getTitle());
            issue.setDescription(newIssue.getDescription());
            issue.setStatus(newIssue.getStatus());
            issue.setPriority(newIssue.getPriority());
            return issue;
        } else {
            return null;
        }
    }

    @Transactional
    public Issue deleteIssue(Integer id) {
        Issue issue = this.findById(id);

        if (issue != null) {
            issueRepository.delete(issue);
            return issue;
        } else {
            return null;
        }
    }
}
