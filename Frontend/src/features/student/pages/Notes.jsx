import { useState } from 'react';
import { Upload, FileText, Download, Eye, Filter } from 'lucide-react';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Modal from '@/components/Modal';
import { useToast } from '@/hooks/useToast';
import ToastNotification from '@/components/ToastNotification';
import { useAuth } from '@/context/AuthContext';

const Notes = () => {
  const [selectedNote, setSelectedNote] = useState(null);
  const [filter, setFilter] = useState('all');
  const { toasts, showToast, removeToast } = useToast();
  const { user } = useAuth();
  const isTeacher = user?.role === 'Teacher' || user?.role === 'Admin';

  const notes = [
    {
      id: 1,
      title: 'Software Engineering - SDLC Models',
      subject: 'SE & PM',
      date: '2024-01-20',
      author: 'Prof. Shashikala R.D.',
      pages: 15,
      visibility: 'Public',
      tag: 'Important'
    },
    {
      id: 2,
      title: 'Unix System Calls and Commands',
      subject: 'UNIX',
      date: '2024-01-19',
      author: 'Prof. Rakhi Patil',
      pages: 22,
      visibility: 'Class Only',
      tag: 'Exam'
    },
    {
      id: 3,
      title: 'Theory of Computation - Automata',
      subject: 'TOC',
      date: '2024-01-18',
      author: 'Prof. Sneha K.',
      pages: 18,
      visibility: 'Public',
      tag: 'Reference'
    },
    {
      id: 4,
      title: 'Computer Networks - TCP/IP Protocol',
      subject: 'CN',
      date: '2024-01-17',
      author: 'Dr. Prakash K Sonwalkar',
      pages: 12,
      visibility: 'Public',
      tag: 'Important'
    },
    {
      id: 5,
      title: 'Research Methodology - Literature Review',
      subject: 'RM & IPR',
      date: '2024-01-16',
      author: 'Prof. Pallavi Dixit',
      pages: 8,
      visibility: 'Class Only',
      tag: 'Assignment'
    },
    {
      id: 6,
      title: 'Data Visualization - D3.js Basics',
      subject: 'Data Visualization',
      date: '2024-01-15',
      author: 'Prof. Sneha K.',
      pages: 20,
      visibility: 'Public',
      tag: 'Important'
    },
    {
      id: 7,
      title: 'Environmental Studies - Sustainability',
      subject: 'EVS',
      date: '2024-01-14',
      author: 'Prof. Sandhya K.',
      pages: 10,
      visibility: 'Public',
      tag: 'Reference'
    },
  ];

  const subjects = ['all', 'SE & PM', 'UNIX', 'TOC', 'CN', 'RM & IPR', 'Data Visualization', 'EVS'];

  const filteredNotes = filter === 'all' 
    ? notes 
    : notes.filter(note => note.subject === filter);

  const handleUpload = () => {
    showToast('Note uploaded successfully!', 'success');
  };

  const handleDownload = (note) => {
    showToast(`Downloading ${note.title}...`, 'info');
  };

  const handlePreview = (note) => {
    setSelectedNote(note);
  };

  return (
    <div className="space-y-6">
      <ToastNotification toasts={toasts} removeToast={removeToast} />
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-textPrimary dark:text-white">
            Notes Sharing
          </h1>
          <p className="text-textSecondary dark:text-gray-400 mt-1">
            {isTeacher ? 'Upload and manage study materials' : 'Access study materials'}
          </p>
        </div>
        {isTeacher && (
          <Button onClick={handleUpload}>
            <Upload size={20} />
            Upload Note
          </Button>
        )}
      </div>

      {/* Upload Section - Only for Teachers */}
      {isTeacher && (
        <Card>
          <h3 className="text-lg font-semibold mb-4 text-textPrimary dark:text-white">
            Quick Upload
          </h3>
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
            <Upload className="mx-auto text-gray-400 mb-3" size={48} />
            <p className="text-textPrimary dark:text-white font-medium mb-1">
              Click to upload or drag and drop
            </p>
            <p className="text-sm text-textSecondary dark:text-gray-400">
              PDF, DOC, or Images (Max 10MB)
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <input
              type="text"
              placeholder="Note Title"
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-textPrimary dark:text-white"
            />
            <select className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-textPrimary dark:text-white">
              <option>Select Subject</option>
              {subjects.filter(s => s !== 'all').map(subject => (
                <option key={subject}>{subject}</option>
              ))}
            </select>
            <select className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-textPrimary dark:text-white">
              <option>Visibility</option>
              <option>Public</option>
              <option>Class Only</option>
              <option>Private</option>
            </select>
          </div>
        </Card>
      )}

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <Filter className="text-textSecondary dark:text-gray-400" size={20} />
        {subjects.map(subject => (
          <Button
            key={subject}
            variant={filter === subject ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilter(subject)}
          >
            {subject.charAt(0).toUpperCase() + subject.slice(1)}
          </Button>
        ))}
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotes.map(note => (
          <Card key={note.id} hover={true}>
            <div className="flex items-start justify-between mb-3">
              <div className="bg-primary/10 p-3 rounded-lg">
                <FileText className="text-primary" size={24} />
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${
                note.tag === 'Important' ? 'bg-error/10 text-error' :
                note.tag === 'Exam' ? 'bg-accent/10 text-accent' :
                'bg-primary/10 text-primary'
              }`}>
                {note.tag}
              </span>
            </div>
            <h3 className="font-semibold text-textPrimary dark:text-white mb-2 line-clamp-2">
              {note.title}
            </h3>
            <div className="space-y-1 text-sm text-textSecondary dark:text-gray-400 mb-4">
              <p>Subject: {note.subject}</p>
              <p>By: {note.author}</p>
              <p>Date: {note.date}</p>
              <p>Pages: {note.pages}</p>
            </div>
            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant="outline" 
                className="flex-1"
                onClick={() => handlePreview(note)}
              >
                <Eye size={16} />
                Preview
              </Button>
              <Button 
                size="sm" 
                className="flex-1"
                onClick={() => handleDownload(note)}
              >
                <Download size={16} />
                Download
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Preview Modal */}
      <Modal
        isOpen={!!selectedNote}
        onClose={() => setSelectedNote(null)}
        title={selectedNote?.title || ''}
        size="lg"
      >
        <div className="space-y-4">
          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-8 text-center">
            <FileText className="mx-auto text-gray-400 mb-3" size={64} />
            <p className="text-textSecondary dark:text-gray-400">
              PDF Preview Placeholder
            </p>
            <p className="text-sm text-textSecondary dark:text-gray-400 mt-2">
              {selectedNote?.pages} pages
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-textSecondary dark:text-gray-400">Subject</p>
              <p className="font-semibold text-textPrimary dark:text-white">
                {selectedNote?.subject}
              </p>
            </div>
            <div>
              <p className="text-textSecondary dark:text-gray-400">Author</p>
              <p className="font-semibold text-textPrimary dark:text-white">
                {selectedNote?.author}
              </p>
            </div>
            <div>
              <p className="text-textSecondary dark:text-gray-400">Date</p>
              <p className="font-semibold text-textPrimary dark:text-white">
                {selectedNote?.date}
              </p>
            </div>
            <div>
              <p className="text-textSecondary dark:text-gray-400">Visibility</p>
              <p className="font-semibold text-textPrimary dark:text-white">
                {selectedNote?.visibility}
              </p>
            </div>
          </div>
          <Button 
            className="w-full"
            onClick={() => handleDownload(selectedNote)}
          >
            <Download size={20} />
            Download Full Note
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Notes;
