import createError from 'http-errors';
import Result from './result.model.js';

export const publishResult = async ({
  student,
  examName,
  term,
  academicYear,
  scores,
  totalMarks,
  percentage,
  cgpa,
  remarks,
  metadata
}) => {
  const payload = {
    student,
    examName,
    term,
    academicYear,
    scores,
    totalMarks,
    percentage,
    cgpa,
    remarks,
    metadata,
    published: true,
    publishedAt: new Date()
  };

  const result = await Result.findOneAndUpdate(
    { student, examName, term },
    payload,
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  return result;
};

export const listResultsByStudent = async ({ student, examName, term }) => {
  const query = { student };
  if (examName) query.examName = examName;
  if (term) query.term = term;

  const results = await Result.find(query).sort({ createdAt: -1 });
  return results;
};

export const listResults = async ({ search, examName, term }) => {
  const query = {};
  if (examName) query.examName = examName;
  if (term) query.term = term;

  if (search) {
    query.$or = [{ academicYear: { $regex: search, $options: 'i' } }, { remarks: { $regex: search, $options: 'i' } }];
  }

  const results = await Result.find(query)
    .populate('student', 'name email department year')
    .sort({ createdAt: -1 });

  return results;
};

export const getResultById = async (id) => {
  const result = await Result.findById(id).populate('student', 'name email department year');
  if (!result) {
    throw createError(404, 'Result not found');
  }
  return result;
};

export const deleteResult = async (id) => {
  const result = await Result.findById(id);
  if (!result) {
    throw createError(404, 'Result not found');
  }
  await result.deleteOne();
};

export default {
  publishResult,
  listResultsByStudent,
  listResults,
  getResultById,
  deleteResult
};
