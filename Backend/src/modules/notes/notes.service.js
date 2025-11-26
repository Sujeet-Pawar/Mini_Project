import createError from 'http-errors';
import Note from './notes.model.js';

export const createNote = async ({ title, description, tags, fileUrl, fileKey, uploadedBy, visibility, allowedRoles, allowedClassIds, metadata }) => {
  const note = await Note.create({
    title,
    description,
    tags,
    fileUrl,
    fileKey,
    uploadedBy,
    visibility,
    allowedRoles,
    allowedClassIds,
    metadata
  });

  return note;
};

export const listNotes = async ({ role, classIds, search }) => {
  const query = {};

  if (search) {
    query.$and = query.$and || [];
    query.$and.push({
      $or: [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ]
    });
  }

  const visibilityClauses = [{ visibility: 'Public' }];

  if (role === 'Student') {
    visibilityClauses.push({ visibility: 'Students' });
  }
  if (role === 'Faculty') {
    visibilityClauses.push({ visibility: 'Faculty' });
  }
  if (role === 'Admin') {
    visibilityClauses.push({ visibility: 'Admins' });
  }

  visibilityClauses.push({ visibility: 'Custom', allowedRoles: { $in: [role] } });

  if (classIds?.length) {
    visibilityClauses.push({ visibility: 'Custom', allowedClassIds: { $in: classIds } });
  }

  query.$and = query.$and || [];
  query.$and.push({ $or: visibilityClauses });

  const notes = await Note.find(query)
    .populate('uploadedBy', 'name email role')
    .sort({ createdAt: -1 });

  return notes;
};

export const getNoteById = async (id, role) => {
  const note = await Note.findById(id).populate('uploadedBy', 'name email role');
  if (!note) {
    throw createError(404, 'Note not found');
  }

  if (note.visibility === 'Custom' && !note.allowedRoles.includes(role)) {
    throw createError(403, 'You do not have access to this note');
  }

  return note;
};

export const updateNote = async (id, payload) => {
  const note = await Note.findByIdAndUpdate(id, payload, { new: true });
  if (!note) {
    throw createError(404, 'Note not found');
  }
  return note;
};

export const deleteNote = async (id) => {
  const note = await Note.findById(id);
  if (!note) {
    throw createError(404, 'Note not found');
  }
  await note.deleteOne();
};

export default {
  createNote,
  listNotes,
  getNoteById,
  updateNote,
  deleteNote
};
