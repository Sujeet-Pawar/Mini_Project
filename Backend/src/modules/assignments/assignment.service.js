import createError from 'http-errors';
import { Assignment, Submission } from './assignment.model.js';

export const createAssignment = async ({ title, description, instructions, dueDate, classIds, issuedBy, attachments, metadata }) => {
  const assignment = await Assignment.create({
    title,
    description,
    instructions,
    dueDate,
    classIds,
    issuedBy,
    attachments,
    metadata
  });

  return assignment;
};

export const listAssignments = async ({ classIds, role, issuedBy }) => {
  const query = {};

  if (role === 'Faculty' || role === 'Admin') {
    if (issuedBy) {
      query.issuedBy = issuedBy;
    }
  } else if (classIds?.length) {
    query.classIds = { $in: classIds };
  }

  const assignments = await Assignment.find(query)
    .populate('issuedBy', 'name email role')
    .sort({ dueDate: 1, createdAt: -1 });

  return assignments;
};

export const getAssignmentById = async (id) => {
  const assignment = await Assignment.findById(id).populate('issuedBy', 'name email role');
  if (!assignment) {
    throw createError(404, 'Assignment not found');
  }

  return assignment;
};

export const updateAssignment = async (id, payload) => {
  const assignment = await Assignment.findByIdAndUpdate(id, payload, { new: true });
  if (!assignment) {
    throw createError(404, 'Assignment not found');
  }
  return assignment;
};

export const deleteAssignment = async (id) => {
  const assignment = await Assignment.findById(id);
  if (!assignment) {
    throw createError(404, 'Assignment not found');
  }
  await assignment.deleteOne();
  await Submission.deleteMany({ assignment: id });
};

export const submitAssignment = async ({ assignmentId, studentId, files, metadata }) => {
  const assignment = await Assignment.findById(assignmentId);
  if (!assignment) {
    throw createError(404, 'Assignment not found');
  }

  if (assignment.dueDate && new Date() > new Date(assignment.dueDate)) {
    metadata = { ...metadata, submittedLate: true };
  }

  const submission = await Submission.findOneAndUpdate(
    { assignment: assignmentId, student: studentId },
    {
      files,
      submittedAt: new Date(),
      status: new Date() > new Date(assignment.dueDate) ? 'Late' : 'Submitted',
      metadata
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  return submission;
};

export const listSubmissions = async ({ assignmentId }) => {
  const submissions = await Submission.find({ assignment: assignmentId })
    .populate('student', 'name email')
    .populate('grade.gradedBy', 'name email role')
    .sort({ submittedAt: -1 });

  return submissions;
};

export const gradeSubmission = async ({ submissionId, score, remarks, gradedBy }) => {
  const submission = await Submission.findById(submissionId);
  if (!submission) {
    throw createError(404, 'Submission not found');
  }

  submission.status = 'Graded';
  submission.grade = { score, remarks, gradedBy };
  await submission.save();

  return submission;
};

export const deleteSubmission = async (submissionId) => {
  const submission = await Submission.findById(submissionId);
  if (!submission) {
    throw createError(404, 'Submission not found');
  }

  await submission.deleteOne();
};

export default {
  createAssignment,
  listAssignments,
  getAssignmentById,
  updateAssignment,
  deleteAssignment,
  submitAssignment,
  listSubmissions,
  gradeSubmission,
  deleteSubmission
};
