import Card from '@/components/Card';
import Table from '@/components/Table';
import { Search } from 'lucide-react';

const headers = ['ID', 'Name', 'Email', 'Performance', 'Status'];
const rows = [
  ['STU001', 'Omkar Patil', 'omkar@college.edu', '92%', 'Excellent'],
  ['STU014', 'Nisha Kumar', 'nisha@college.edu', '84%', 'Good'],
  ['STU025', 'Sanjay Rao', 'sanjay@college.edu', '76%', 'Average'],
  ['STU041', 'Aditi Kulkarni', 'aditi@college.edu', '89%', 'Good']
];

const Students = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-textPrimary dark:text-white">Students</h1>
          <p className="text-textSecondary dark:text-gray-400">Track progress and outreach.</p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search students"
            className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
          />
        </div>
      </div>

      <Card>
        <Table headers={headers} data={rows} />
      </Card>
    </div>
  );
};

export default Students;

