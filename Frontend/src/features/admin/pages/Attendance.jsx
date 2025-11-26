import { useState } from 'react';
import { Calendar, Search, Filter, TrendingUp } from 'lucide-react';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Table from '@/components/Table';
import ChartWidget from '@/components/ChartWidget';

const Attendance = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const attendanceRecords = [
    {
      id: 1,
      class: 'CSE 3A',
      subject: 'Database Management Systems',
      date: '2024-12-10',
      present: 45,
      absent: 5,
      total: 50
    },
    {
      id: 2,
      class: 'CSE 3B',
      subject: 'Data Structures',
      date: '2024-12-10',
      present: 40,
      absent: 2,
      total: 42
    },
    {
      id: 3,
      class: 'CSE 3A',
      subject: 'Web Technologies',
      date: '2024-12-09',
      present: 48,
      absent: 2,
      total: 50
    }
  ];

  const filteredRecords = attendanceRecords.filter(
    (record) =>
      record.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const tableHeaders = ['Class', 'Subject', 'Date', 'Present', 'Absent', 'Total', 'Rate'];
  const tableData = filteredRecords.map((record) => [
    record.class,
    record.subject,
    new Date(record.date).toLocaleDateString(),
    record.present,
    record.absent,
    record.total,
    `${Math.round((record.present / record.total) * 100)}%`
  ]);

  const weeklyData = [
    { name: 'Mon', attendance: 85 },
    { name: 'Tue', attendance: 88 },
    { name: 'Wed', attendance: 92 },
    { name: 'Thu', attendance: 87 },
    { name: 'Fri', attendance: 90 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-textPrimary dark:text-white">Attendance Management</h1>
          <p className="text-textSecondary dark:text-gray-400 mt-1">
            View and manage attendance records
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-textSecondary dark:text-gray-400 text-sm">Today's Attendance</p>
              <p className="text-3xl font-bold text-textPrimary dark:text-white mt-2">87%</p>
            </div>
            <div className="bg-primary/10 p-4 rounded-lg">
              <Calendar className="text-primary" size={24} />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-textSecondary dark:text-gray-400 text-sm">This Week</p>
              <p className="text-3xl font-bold text-textPrimary dark:text-white mt-2">89%</p>
            </div>
            <div className="bg-success/10 p-4 rounded-lg">
              <TrendingUp className="text-success" size={24} />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-textSecondary dark:text-gray-400 text-sm">This Month</p>
              <p className="text-3xl font-bold text-textPrimary dark:text-white mt-2">86%</p>
            </div>
            <div className="bg-accent/10 p-4 rounded-lg">
              <Calendar className="text-accent" size={24} />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartWidget
          title="Weekly Attendance Trend"
          data={weeklyData}
          type="line"
          dataKey="attendance"
        />

        <Card>
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search records..."
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
    </div>
  );
};

export default Attendance;

