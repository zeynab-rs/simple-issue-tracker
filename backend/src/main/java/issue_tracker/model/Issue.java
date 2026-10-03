package issue_tracker.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.EnumType;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
public class Issue {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer id;
    @NotBlank(message = "Title must not be blank")
    @Size(min=3, message = "Title must be at least 3 characters")
    private String title;
    @NotBlank(message = "Description must not be blank")
    private String description;
    @Enumerated(EnumType.STRING)
    private IssueStatus status = IssueStatus.TODO;
    @Enumerated(EnumType.STRING)
    private IssuePriority priority = IssuePriority.LOW;

    public Issue() {

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
