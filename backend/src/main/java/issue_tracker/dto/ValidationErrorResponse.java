package issue_tracker.dto;

import java.util.Map;

public class ValidationErrorResponse {
    private String message;
    private Map<String, String> errors;

    public String getMessage() {
        return this.message;
    }

    public Map<String, String> getErrors() {
        return this.errors;
    }

    public void setMessage(String msg) {
        this.message = msg;
    }

    public void setErrors(Map<String, String> errors) {
        this.errors = errors;
    }
}
