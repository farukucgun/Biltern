package Caffe.BilternServer.report;

/**
 * This is the special enum class for ReportStat, containing valid states that are used throughout the system
 */
public enum ReportStats {
    NOT_SUBMITTED(" ", "Waiting for submission", "Submitted"),
    SUBMITTED("Submitted", "Waiting for approval", "Approved"),
    ITERATION_SUBMITTED("Submitted", "Waiting for grading", "Graded"),
    APPROVED("Approved", "Waiting for grading", "Graded"),
    GRADED("Waiting for grading", "Graded", " "),
    ITERATION("Revision requested", "Waiting for submission", "Submitted"),
    WITHDRAWN(" ", "Withdrawn", " ");

    private final String[] statusArray;

    ReportStats(String... statusArray) {
        this.statusArray = statusArray;
    }
    public String[] getStatusArray() {
        return statusArray;
    }
}

