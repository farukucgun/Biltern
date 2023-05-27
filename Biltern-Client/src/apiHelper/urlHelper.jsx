export const COMMON_PATH = 'http://localhost:8080/'

// report controller
export const REPORT_DUEDATE_PATH = (reportId) => COMMON_PATH + 'report/dueDate/' + reportId;
export const APPROVAL_DUEDATE_PATH = (reportId) => COMMON_PATH + 'report/approvalDueDate/' + reportId;
export const REPORT_CONTENT_PATH = (reportId) => COMMON_PATH + 'report/reportContent/' + reportId;
export const REPORT_FEEDBACK_PATH = (reportId) => COMMON_PATH + 'report/feedback/' + reportId;
export const PREVIEW_FEEDBACK_PATH = (reportId) => COMMON_PATH + 'report/previewFeedback/' + reportId; 
export const ITERATION_PATH = (reportId) => COMMON_PATH + 'report/iteration/' + reportId;
export const REPORT_STATUS_PATH = (reportId) => COMMON_PATH + 'report/reportStatus/' + reportId;
export const COMPANY_STATUS_PATH = (reportId) => COMMON_PATH + 'report/companyStatus/' + reportId;
export const GRADING_FORM_PATH = (reportId) => COMMON_PATH + 'report/gradingForm/' + reportId;
export const GRADER_PATH = (reportId) => COMMON_PATH + 'report/grader/' + reportId;
export const TA_PATH = (reportId) => COMMON_PATH + 'report/TA' + reportId;

// auth controller

