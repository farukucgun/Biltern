import { getFetcher, postFetcher, putFetcher, patchFetcher, deleteFetcher } from "./apiHelper";
import * as url from "./urlHelper";

// report controller
export const changeReportDueDate = async (reportId, data) => {
    return await putFetcher(url.REPORT_DUEDATE_PATH(reportId), data);
}

export const getReportDueDate = async (reportId) => {
    return await getFetcher(url.REPORT_DUEDATE_PATH(reportId));
}

export const changeApprovalDueDate = async (reportId, data) => {
    return await putFetcher(url.APPROVAL_DUEDATE_PATH(reportId), data);
}

export const getApprovalDueDate = async (reportId) => {
    return await getFetcher(url.APPROVAL_DUEDATE_PATH(reportId));
}

export const uploadReportContent = async ( data, contentType) => {
    return await putFetcher(url.REPORT_CONTENT_PATH(), data, contentType);
}

export const getReportContent = async (reportId, responseType) => {
    return await getFetcher(url.REPORT_CONTENT_PATH(reportId), responseType);
}

export const deleteReportContent = async (reportId) => {
    return await deleteFetcher(url.REPORT_CONTENT_PATH(reportId));
}

export const uploadReportFeedback = async (reportId, data, contentType) => {
    return await putFetcher(url.REPORT_FEEDBACK_PATH(reportId), data, contentType);
}     

export const getReportFeedback = async (reportId, responseType) => {
    return await getFetcher(url.REPORT_FEEDBACK_PATH(reportId), responseType);
}

export const uploadPreviewFeedback = async (reportId, data, contentType) => {
    return await postFetcher(url.PREVIEW_FEEDBACK_PATH(reportId), data, contentType);
}

export const getPreviewFeedback = async (reportId, responseType) => {
    return await getFetcher(url.PREVIEW_FEEDBACK_PATH(reportId), responseType);
}

export const uploadIteration = async (reportId, data, contentType) => {
    return await postFetcher(url.ITERATION_PATH(reportId), data, contentType);
}

export const getReportStatus = async (reportId) => {
    return await getFetcher(url.REPORT_STATUS_PATH(reportId));
}

export const getCompanyStatus = async (reportId) => {
    return await getFetcher(url.COMPANY_STATUS_PATH(reportId));
}

export const submitGradingForm = async (reportId, data, contentType) => {
    return await putFetcher(url.GRADING_FORM_PATH(reportId), data, contentType);
}

export const getGradingForm = async (reportId, responseType) => {
    return await getFetcher(url.GRADING_FORM_PATH(reportId), responseType);
}

export const getGrading = async (reportId) => {
    return await getFetcher(url.GET_GRADING(reportId));
}

export const getReportGrader = async (reportId) => {
    return await getFetcher(url.GRADER_REPORT_PATH(reportId));
}

export const getReportTA = async (reportId) => {
    return await getFetcher(url.TA_PATH(reportId));
}

export const getSpecificIteration = async (reportId, responseType) =>{
    return await getFetcher(url.GET_SPECIFIC_ITERATION_PATH(reportId), responseType);
}

// coordinator controller
export const getCoordinators = async () => {
    return await getFetcher(url.COORDINATOR_PATH());
}

export const addCoordinator = async (data) => {
    return await postFetcher(url.COORDINATOR_PATH(), data);
}

export const deleteCoordinator = async (data) => {
    return await deleteFetcher(url.COORDINATOR_SELECT_PATH(), data);
}

// grader controller
export const getGraders = async () => {
    return await getFetcher(url.GRADER_PATH());
}

export const addGrader = async (data) => {
    return await postFetcher(url.GRADER_PATH(), data);
}

export const deleteGrader = async (data) => {
    return await deleteFetcher(url.GRADER_SELECT_PATH(), data);
}

export const getGraderDetails = async () => {
    return await getFetcher(url.GRADER_DETAILS_PATH());
}

export const uploadSignature = async ( signature, contentType) => {
    return await putFetcher(url.GRADER_SIGNATURE_PATH(), signature, contentType);
}

export const displaySignature = async (responseType) =>{
    return await getFetcher(url.GRADER_SIGNATURE_PATH(), responseType);
}

// secretary controller
export const getSecretaries = async () => {
    return await getFetcher(url.SECRETARY_PATH());
}

export const addSecretary = async (data) => {
    return await postFetcher(url.SECRETARY_PATH(), data);
}

export const deleteSecretary = async (data) => {
    return await deleteFetcher(url.SECRETARY_SELECT_PATH(), data);
}

export const getSecretaryDetails = async () => {
    return await getFetcher(url.SECRETARY_DETAILS());
} 

// student controller
export const addStudent = async (data) => {
    return await postFetcher(url.STUDENT_PATH(), data);
}

export const deleteStudent = async (data) => {
    return await deleteFetcher(url.STUDENT_SELECT_PATH(), data);
}

export const getStudentDetails = async () => {
    return await getFetcher(url.STUDENT_DETAILS_PATH());
}

export const getStudentDetailsById = async (studentId) => {
    return await getFetcher(url.STUDENT_DETAILS_BY_ID_PATH(studentId));
}  

export const getIterations = async () => {
    return await getFetcher(url.STUDENT_ITERATIONS_PATH());
}

// teaching assistant controller
export const getTeachingAssistants = async () => {
    return await getFetcher(url.TEACHING_ASSISTANT_PATH());
}

export const addTeachingAssistant = async (data) => {
    return await postFetcher(url.TEACHING_ASSISTANT_PATH(), data);
}

export const deleteTeachingAssistant = async (data) => {
    return await deleteFetcher(url.TEACHING_ASSISTANT_SELECT_PATH(), data);
}   

export const getTeachingAssistantDetails = async () => {
    return await getFetcher(url.TEACHING_ASSISTANT_DETAILS_PATH());
}

// role administration controller
export const assignRoleToUsers = async (role, data) => {
    return await patchFetcher(url.ASSIGN_ROLE_PATH(role), data);
}

export const registerUser = async (data) => {
    return await postFetcher(url.REGISTER_USER_PATH(), data);
}

// statistics controller
export const getDepartmentCourseStatistics = async () => {
    return await getFetcher(url.DEPARTMENT_COURSE_STATISTICS_PATH());
}

export const getGraderStatistics = async () => {
    return await getFetcher(url.GRADER_STATISTICS_PATH());
}

export const getTaStatistics = async () => {
    return await getFetcher(url.TA_STATISTICS_PATH());
}

// course controller
export const getCourses = async () => {
    return await getFetcher(url.COURSE_PATH());
}

export const addCourse = async (data) => {
    return await postFetcher(url.COURSE_PATH(), data);
}

// assignment controller
export const initSemester = async (data, contentType) => {
    return await postFetcher(url.SEMESTER_PATH(), data, contentType);
}