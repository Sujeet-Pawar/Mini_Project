import asyncHandler from '../../utils/async-handler.js';
import { successResponse } from '../../utils/api-response.js';
import {
  createAssignment,
  listAssignments,
  getAssignmentById,
  updateAssignment,
  deleteAssignment,
  submitAssignment,
  listSubmissions,
  gradeSubmission,
  deleteSubmission
} from './assignment.service.js';

export const postAssignment = asyncHandler(async (req, res) => {
  const assignment = await createAssignment({
    ...req.body,
    issuedBy: req.user.id
  });

  successResponse(res, { statusCode: 201, message: 'Assignment created', data: assignment });
});

export const getAssignments = asyncHandler(async (req, res) => {
  const role = req.user.role;
  const classIds = req.user.classIds;
  const assignments = await listAssignments({
    classIds,
    role,
    issuedBy: role !== 'Student' ? req.user.id : undefined
  });

  successResponse(res, { data: assignments });
});

export const getAssignment = asyncHandler(async (req, res) => {
  const assignment = await getAssignmentById(req.params.id);
  successResponse(res, { data: assignment });
});

export const patchAssignment = asyncHandler(async (req, res) => {
  const assignment = await updateAssignment(req.params.id, req.body);
  successResponse(res, { data: assignment, message: 'Assignment updated' });
});

export const removeAssignment = asyncHandler(async (req, res) => {
  await deleteAssignment(req.params.id);
  successResponse(res, { message: 'Assignment deleted' });
});

export const postSubmission = asyncHandler(async (req, res) => {
  const submission = await submitAssignment({
    assignmentId: req.params.id,
    studentId: req.user.id,
    files: req.body.files,
    metadata: req.body.metadata
  });

  successResponse(res, { data: submission, statusCode: 201, message: 'Submission saved' });
});

export const getAssignmentSubmissions = asyncHandler(async (req, res) => {
  const submissions = await listSubmissions({ assignmentId: req.params.id });
  successResponse(res, { data: submissions });
});

export const postGradeSubmission = asyncHandler(async (req, res) => {
  const submission = await gradeSubmission({
    submissionId: req.params.submissionId,
    score: req.body.score,
    remarks: req.body.remarks,
    gradedBy: req.user.id
  });

  successResponse(res, { data: submission, message: 'Submission graded' });
});

export const deleteSubmissionController = asyncHandler(async (req, res) => {
  await deleteSubmission(req.params.submissionId);
  successResponse(res, { message: 'Submission removed' });
});

export default {
  postAssignment,
  getAssignments,
  getAssignment,
  patchAssignment,
  removeAssignment,
  postSubmission,
  getAssignmentSubmissions,
  postGradeSubmission,
  deleteSubmissionController
};
