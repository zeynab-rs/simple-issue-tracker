package issue_tracker.model;

public class Issue {
    private Integer id;
    private String title;
    private String description;
    private IssueStatus status;
    private IssuePriority priority;

    public Issue() {

    }

    public Issue(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return this.id;
    }

    public String getTitle() {
        return this.title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public IssueStatus getStatus() {
        return this.status;
    }

    public void setStatus(IssueStatus status) {
        this.status = status;
    }

    public IssuePriority getPriority() {
        return this.priority;
    }

    public void setPriority(IssuePriority priority) {
        this.priority = priority;
    }
}
