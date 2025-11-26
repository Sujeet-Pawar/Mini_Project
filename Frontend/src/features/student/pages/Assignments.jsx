import { useState } from 'react';
import { Plus, Upload, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import Modal from '../components/Modal';
import { useToast } from '../hooks/useToast';
import ToastNotification from '../components/ToastNotification';
import { useAuth } from '../context/AuthContext';

const Assignments = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { toasts, showToast, removeToast } = useToast();
  const { user } = useAuth();
  const isTeacher = user?.role === 'Teacher';

  const assignments = [
    {
      id: 1,
      title: 'Software Project Management Plan',
      subject: 'SE & PM',
      dueDate: '2025-11-15',
      status: 'pending',
      points: 25,
      description: 'Create a complete project management plan for a software project'
    },
    {
      id: 2,
      title: 'Unix Shell Scripting Assignment',
      subject: 'UNIX',
      dueDate: '2025-10-28',
      status: 'submitted',
      points: 25,
      grade: 23,
      description: 'Write shell scripts for file management and automation'
    },
    {
      id: 3,
      title: 'Automata Theory Problems',
      subject: 'TOC',
      dueDate: '2025-11-20',
      status: 'pending',
      points: 25,
      description: 'Solve problems on DFA, NFA, and regular expressions'
    },
    {
      id: 4,
      title: 'Network Protocol Implementation',
      subject: 'CN',
      dueDate: '2025-10-25',
      status: 'graded',
      points: 25,
      grade: 24,
      description: 'Implement TCP/IP protocol simulation'
    },
    {
      id: 5,
      title: 'Research Paper Review',
      subject: 'RM & IPR',
      dueDate: '2025-11-10',
      status: 'pending',
      points: 25,
      description: 'Review and critique a research paper in your domain'
    },
    {
      id: 6,
      title: 'Data Visualization Dashboard',
      subject: 'Data Visualization',
      dueDate: '2025-11-05',
      status: 'pending',
      points: 25,
      description: 'Create an interactive dashboard using D3.js'
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-accent bg-accent/10';
      case 'submitted': return 'text-primary bg-primary/10';
      case 'graded': return 'text-success bg-success/10';
      default: return 'text-gray-500 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock size={16} />;
      case 'submitted': return <Upload size={16} />;
      case 'graded': return <CheckCircle size={16} />;
      default: return <AlertCircle size={16} />;
    }
  };

  const handleSubmit = (assignmentId) => {
    showToast('Assignment submitted successfully!', 'success');
  };

  const handleCreateAssignment = () => {
    showToast('Assignment created successfully!', 'success');
    setIsCreateModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <ToastNotification toasts={toasts} removeToast={removeToast} />
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-textPrimary dark:text-white">
            Assignments
          </h1>
          <p className="text-textSecondary dark:text-gray-400 mt-1">
            {isTeacher ? 'Manage and grade assignments' : 'View and submit your assignments'}
          </p>
        </div>
        {isTeacher && (
          <Button onClick={() => setIsCreateModalOpen(true)}>
            <Plus size={20} />
            Create Assignment
          </Button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center gap-3">
            <div className="bg-accent/10 p-3 rounded-lg">
              <Clock className="text-accent" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-textPrimary dark:text-white">3</p>
              <p className="text-sm text-textSecondary dark:text-gray-400">Pending</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-3 rounded-lg">
              <Upload className="text-primary" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-textPrimary dark:text-white">1</p>
              <p className="text-sm text-textSecondary dark:text-gray-400">Submitted</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="bg-success/10 p-3 rounded-lg">
              <CheckCircle className="text-success" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-textPrimary dark:text-white">1</p>
              <p className="text-sm text-textSecondary dark:text-gray-400">Graded</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="bg-secondary/10 p-3 rounded-lg">
              <CheckCircle className="text-secondary" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-textPrimary dark:text-white">95%</p>
              <p className="text-sm text-textSecondary dark:text-gray-400">Avg Score</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Assignments List */}
      <div className="grid grid-cols-1 gap-6">
        {assignments.map(assignment => (
          <Card key={assignment.id}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-semibold text-textPrimary dark:text-white">
                    {assignment.title}
                  </h3>
                  <span className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${getStatusColor(assignment.status)}`}>
                    {getStatusIcon(assignment.status)}
                    {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                  </span>
                </div>
                <p className="text-textSecondary dark:text-gray-400 mb-3">
                  {assignment.description}
                </p>
                <div className="flex items-center gap-6 text-sm text-textSecondary dark:text-gray-400">
                  <span>Subject: <strong>{assignment.subject}</strong></span>
                  <span>Due: <strong>{assignment.dueDate}</strong></span>
                  <span>Points: <strong>{assignment.points}</strong></span>
                  {assignment.grade && (
                    <span className="text-success font-semibold">
                      Grade: {assignment.grade}/{assignment.points}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                {assignment.status === 'pending' && !isTeacher && (
                  <Button size="sm" onClick={() => handleSubmit(assignment.id)}>
                    <Upload size={16} />
                    Submit
                  </Button>
                )}
                {isTeacher && (
                  <Button size="sm" variant="outline">
                    View Submissions
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Create Assignment Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Assignment"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-textPrimary dark:text-white mb-2">
              Title
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-textPrimary dark:text-white"
              placeholder="Assignment title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-textPrimary dark:text-white mb-2">
              Subject
            </label>
            <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-textPrimary dark:text-white">
              <option>SE & PM</option>
              <option>UNIX</option>
              <option>TOC</option>
              <option>CN</option>
              <option>RM & IPR</option>
              <option>Data Visualization</option>
              <option>EVS</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-textPrimary dark:text-white mb-2">
              Description
            </label>
            <textarea
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-textPrimary dark:text-white"
              placeholder="Assignment description"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-textPrimary dark:text-white mb-2">
                Due Date
              </label>
              <input
                type="date"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-textPrimary dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-textPrimary dark:text-white mb-2">
                Points
              </label>
              <input
                type="number"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-textPrimary dark:text-white"
                placeholder="100"
              />
            </div>
          </div>
          <Button className="w-full" onClick={handleCreateAssignment}>
            Create Assignment
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Assignments;
