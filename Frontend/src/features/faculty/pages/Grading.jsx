import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileCheck, Search, Filter, Award, TrendingUp } from 'lucide-react';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Table from '@/components/Table';

const Grading = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const submissions = [
    {
      id: 1,
      student: 'Omkar Patil',
      assignment: 'Database Design Project',
      subject: 'Database Management Systems',
      submittedDate: '2024-12-12',
      status: 'pending',
      score: null
    },
    {
      id: 2,
      student: 'Rajesh Kumar',
      assignment: 'Algorithm Analysis Report',
      subject: 'Data Structures',
      submittedDate: '2024-12-11',
      status: 'graded',
      score: 85
    },
    {
      id: 3,
      student: 'Priya Sharma',
      assignment: 'Web Development Assignment',
      subject: 'Web Technologies',
      submittedDate: '2024-12-10',
      status: 'graded',
      score: 92
    }
  ];

  const filteredSubmissions = submissions.filter(
    (submission) =>
      submission.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.assignment.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const tableHeaders = ['Student', 'Assignment', 'Subject', 'Submitted', 'Status', 'Score', 'Actions'];
  const tableData = filteredSubmissions.map((submission) => [
    submission.student,
    submission.assignment,
    submission.subject,
    new Date(submission.submittedDate).toLocaleDateString(),
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${
        submission.status === 'pending'
          ? 'bg-accent/10 text-accent'
          : 'bg-success/10 text-success'
      }`}
    >
      {submission.status}
    </span>,
    submission.score ? `${submission.score}/100` : '-',
    <Button size="sm" variant="primary">
      {submission.status === 'pending' ? 'Grade' : 'View'}
    </Button>
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-textPrimary dark:text-white">Grading</h1>
          <p className="text-textSecondary dark:text-gray-400 mt-1">
            Review and grade student submissions
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-textSecondary dark:text-gray-400 text-sm">Pending Grading</p>
              <p className="text-3xl font-bold text-textPrimary dark:text-white mt-2">12</p>
            </div>
            <div className="bg-accent/10 p-4 rounded-lg">
              <FileCheck className="text-accent" size={24} />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-textSecondary dark:text-gray-400 text-sm">Graded This Month</p>
              <p className="text-3xl font-bold text-textPrimary dark:text-white mt-2">48</p>
            </div>
            <div className="bg-success/10 p-4 rounded-lg">
              <Award className="text-success" size={24} />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-textSecondary dark:text-gray-400 text-sm">Average Score</p>
              <p className="text-3xl font-bold text-textPrimary dark:text-white mt-2">87%</p>
            </div>
            <div className="bg-primary/10 p-4 rounded-lg">
              <TrendingUp className="text-primary" size={24} />
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search submissions..."
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
    </div>
  );
};

export default Grading;

