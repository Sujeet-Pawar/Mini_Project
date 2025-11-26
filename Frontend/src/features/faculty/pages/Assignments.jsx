import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Plus, Search, Filter, Calendar, Users } from 'lucide-react';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Table from '@/components/Table';

const Assignments = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const assignments = [
    {
      id: 1,
      title: 'Database Design Project',
      subject: 'Database Management Systems',
      class: 'CSE 3A',
      dueDate: '2024-12-15',
      submissions: 45,
      totalStudents: 50,
      status: 'active'
    },
    {
      id: 2,
      title: 'Algorithm Analysis Report',
      subject: 'Data Structures',
      class: 'CSE 3B',
      dueDate: '2024-12-20',
      submissions: 38,
      totalStudents: 42,
      status: 'active'
    },
    {
      id: 3,
      title: 'Web Development Assignment',
      subject: 'Web Technologies',
      class: 'CSE 3A',
      dueDate: '2024-12-10',
      submissions: 50,
      totalStudents: 50,
      status: 'completed'
    }
  ];

  const filteredAssignments = assignments.filter(
    (assignment) =>
      assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const tableHeaders = ['Title', 'Subject', 'Class', 'Due Date', 'Submissions', 'Status', 'Actions'];
  const tableData = filteredAssignments.map((assignment) => [
    assignment.title,
    assignment.subject,
    assignment.class,
    new Date(assignment.dueDate).toLocaleDateString(),
    `${assignment.submissions}/${assignment.totalStudents}`,
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${
        assignment.status === 'active'
          ? 'bg-primary/10 text-primary'
          : 'bg-success/10 text-success'
      }`}
    >
      {assignment.status}
    </span>,
    <div className="flex gap-2">
      <Button size="sm" variant="outline">
        View
      </Button>
      <Button size="sm" variant="primary">
        Grade
      </Button>
    </div>
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-textPrimary dark:text-white">Assignments</h1>
          <p className="text-textSecondary dark:text-gray-400 mt-1">
            Manage and grade student assignments
          </p>
        </div>
        <Button>
          <Plus size={20} />
          Create Assignment
        </Button>
      </div>

      <Card>
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search assignments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-textPrimary dark:text-white"
            />
          </div>
          <Button variant="outline">
            <Filter size={20} />
            Filter
          </Button>
        </div>

        <Table headers={tableHeaders} data={tableData} />
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-textSecondary dark:text-gray-400 text-sm">Active Assignments</p>
              <p className="text-3xl font-bold text-textPrimary dark:text-white mt-2">2</p>
            </div>
            <div className="bg-primary/10 p-4 rounded-lg">
              <FileText className="text-primary" size={24} />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-textSecondary dark:text-gray-400 text-sm">Pending Grading</p>
              <p className="text-3xl font-bold text-textPrimary dark:text-white mt-2">5</p>
            </div>
            <div className="bg-accent/10 p-4 rounded-lg">
              <Calendar className="text-accent" size={24} />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-textSecondary dark:text-gray-400 text-sm">Total Submissions</p>
              <p className="text-3xl font-bold text-textPrimary dark:text-white mt-2">133</p>
            </div>
            <div className="bg-success/10 p-4 rounded-lg">
              <Users className="text-success" size={24} />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Assignments;

