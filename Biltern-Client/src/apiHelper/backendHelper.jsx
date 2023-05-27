import { getFetcher, postFetcher, putFetcher, deleteFetcher } from "./apiHelper";

import * as url from "./urlHelper";

export const getReportDueDate = async (reportId) => {
    return await getFetcher(url.REPORT_DUEDATE_PATH(reportId));
}

export const getApprovalDueDate = async (reportId) => {
    return await getFetcher(url.APPROVAL_DUEDATE_PATH(reportId));
}

export const getReportContent = async (reportId, responseType) => {
    return await getFetcher(url.REPORT_CONTENT_PATH(reportId), responseType);
}

export const uploadReportContent = async (reportId, data) => {
    return await postFetcher(url.REPORT_CONTENT_PATH(reportId), data);
}

export const getPreviewFeedback = async (reportId, responseType) => {
    return await getFetcher(url.PREVIEW_FEEDBACK_PATH(reportId), responseType);
}

export const uploadPreviewFeedback = async (reportId, data) => {
    return await postFetcher(url.PREVIEW_FEEDBACK_PATH(reportId), data);
}