import asyncHandler from '../../utils/async-handler.js';
import { successResponse } from '../../utils/api-response.js';
import { publishResult, listResultsByStudent, listResults, getResultById, deleteResult } from './result.service.js';

export const postResult = asyncHandler(async (req, res) => {
  const result = await publishResult(req.body);
  successResponse(res, { statusCode: 201, message: 'Result published', data: result });
});

export const getStudentResults = asyncHandler(async (req, res) => {
  const { examName, term } = req.query;
  const results = await listResultsByStudent({
    student: req.user.id,
    examName,
    term
  });
  successResponse(res, { data: results });
});

export const getAllResults = asyncHandler(async (req, res) => {
  const { search, examName, term } = req.query;
  const results = await listResults({ search, examName, term });
  successResponse(res, { data: results });
});

export const getResult = asyncHandler(async (req, res) => {
  const result = await getResultById(req.params.id);
  successResponse(res, { data: result });
});

export const removeResult = asyncHandler(async (req, res) => {
  await deleteResult(req.params.id);
  successResponse(res, { message: 'Result deleted' });
});

export default {
  postResult,
  getStudentResults,
  getAllResults,
  getResult,
  removeResult
};
