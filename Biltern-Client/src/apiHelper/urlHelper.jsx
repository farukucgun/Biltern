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
export const GRADER_REPORT_PATH = (reportId) => COMMON_PATH + 'report/grader/' + reportId;
export const TA_PATH = (reportId) => COMMON_PATH + 'report/TA' + reportId;

// coordinator controller
export const COORDINATOR_PATH = () => COMMON_PATH + 'coordinator';
export const COORDINATOR_SELECT_PATH = (coordinatorId) => COMMON_PATH + 'coordinator/' + coordinatorId;

// grader controller
export const GRADER_PATH = () => COMMON_PATH + 'grader';
export const GRADER_SELECT_PATH = (graderId) => COMMON_PATH + 'grader/' + graderId;
export const GRADER_DETAILS_PATH = () => COMMON_PATH + 'grader/details';

// secretary controller
export const SECRETARY_PATH = () => COMMON_PATH + 'secretary';
export const SECRETARY_SELECT_PATH = (secretaryId) => COMMON_PATH + 'secretary/' + secretaryId;

// student controller
export const STUDENT_PATH = () => COMMON_PATH + 'student';
export const STUDENT_SELECT_PATH = (studentId) => COMMON_PATH + 'student/' + studentId;
export const STUDENT_DETAILS_PATH = () => COMMON_PATH + 'student/details';
export const STUDENT_DETAILS_BY_ID_PATH = (studentId) => COMMON_PATH + 'student/details/' + studentId;

// teaching assistant controller
export const TEACHING_ASSISTANT_PATH = () => COMMON_PATH + 'teachingassistant';
export const TEACHING_ASSISTANT_SELECT_PATH = (teachingAssistantId) => COMMON_PATH + 'teachingassistant/' + teachingAssistantId;
export const TEACHING_ASSISTANT_DETAILS_PATH = () => COMMON_PATH + 'teachingassistant/details';

// role admisinstration controller
export const ASSIGN_ROLE_PATH = (role) => COMMON_PATH + 'user/administration/assignRoleToUsers/' + role;
export const REGISTER_USER_PATH = () => COMMON_PATH + 'user/administration/register';

// statistics controller
export const DEPARTMENT_COURSE_STATISTICS_PATH = () => COMMON_PATH + 'statistics';
export const GRADER_STATISTICS_PATH = (graderId) => COMMON_PATH + 'statistics/grader' + graderId;
export const TA_STATISTICS_PATH = (taId) => COMMON_PATH + 'statistics/teachingAssistant' + taId;

// course controller
export const COURSE_PATH = () => COMMON_PATH + 'course';

// assignment controller
export const ASSIGNMENT_PATH = () => COMMON_PATH + 'init';








