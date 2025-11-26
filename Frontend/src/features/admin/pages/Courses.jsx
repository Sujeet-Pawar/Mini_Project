import { useState } from 'react';
import { BookOpen, Plus, Search, Edit, Trash2 } from 'lucide-react';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Table from '@/components/Table';

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const courses = [
    {
      id: 1,
      code: 'CSE301',
      name: 'Database Management Systems',
      department: 'CSE',
      credits: 4,
      students: 120
    },
    {
      id: 2,
      code: 'CSE302',
      name: 'Data Structures',
      department: 'CSE',
      credits: 3,
      students: 95
    },
    {
      id: 3,
      code: 'CSE303',
      name: 'Web Technologies',
      department: 'CSE',
      credits: 3,
      students: 110
    }
  ];

  const filteredCourses = courses.filter(
    (course) =>
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const tableHeaders = ['Code', 'Course Name', 'Department', 'Credits', 'Students', 'Actions'];
  const tableData = filteredCourses.map((course) => [
    course.code,
    course.name,
    course.department,
    course.credits,
    course.students,
    <div className="flex gap-2">
      <Button size="sm" variant="outline">
        <Edit size={16} />
      </Button>
      <Button size="sm" variant="danger">
        <Trash2 size={16} />
      </Button>
    </div>
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-textPrimary dark:text-white">Course Management</h1>
          <p className="text-textSecondary dark:text-gray-400 mt-1">
            Manage courses and curriculum
          </p>
        </div>
        <Button>
          <Plus size={20} />
          Add Course
        </Button>
      </div>

      <Card>
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-textPrimary dark:text-white"
            />
          </div>
        </div>

        <Table headers={tableHeaders} data={tableData} />
      </Card>
    </div>
  );
};

export default Courses;

