package issue_tracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import issue_tracker.model.Issue;

public interface IssueRepository extends JpaRepository<Issue, Integer> {

}