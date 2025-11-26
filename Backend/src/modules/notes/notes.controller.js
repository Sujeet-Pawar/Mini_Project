import asyncHandler from '../../utils/async-handler.js';
import { successResponse } from '../../utils/api-response.js';
import { createNote, listNotes, getNoteById, updateNote, deleteNote } from './notes.service.js';

export const postNote = asyncHandler(async (req, res) => {
  const note = await createNote({
    ...req.body,
    uploadedBy: req.session?.user?.id || req.user?.id
  });
  successResponse(res, { statusCode: 201, message: 'Note created', data: note });
});

export const getNotes = asyncHandler(async (req, res) => {
  const role = req.session?.user?.role || req.user?.role;
  const classIds = req.session?.user?.classIds || [];
  const { search } = req.query;
  const notes = await listNotes({ role, classIds, search });
  successResponse(res, { data: notes });
});

export const getNote = asyncHandler(async (req, res) => {
  const role = req.session?.user?.role || req.user?.role;
  const note = await getNoteById(req.params.id, role);
  successResponse(res, { data: note });
});

export const patchNote = asyncHandler(async (req, res) => {
  const note = await updateNote(req.params.id, req.body);
  successResponse(res, { data: note, message: 'Note updated' });
});

export const removeNote = asyncHandler(async (req, res) => {
  await deleteNote(req.params.id);
  successResponse(res, { message: 'Note deleted' });
});

export default {
  postNote,
  getNotes,
  getNote,
  patchNote,
  removeNote
};
