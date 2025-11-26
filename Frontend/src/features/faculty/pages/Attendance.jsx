import { useState } from 'react';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Table from '@/components/Table';

const classes = [
  { id: 'se-5', name: 'Software Engineering - 5th Sem' },
  { id: 'aiml-5', name: 'AIML - 5th Sem' },
  { id: 'final-year', name: 'Final Year Projects' }
];

const sampleStudents = [
  ['OMK001', 'Omkar Patil', 'Present'],
  ['NIK002', 'Nikhil Kulkarni', 'Present'],
  ['AAR003', 'Aarav Desai', 'Late'],
  ['PRI004', 'Priya N', 'Absent']
];

const Attendance = () => {
  const [selectedClass, setSelectedClass] = useState(classes[0].id);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [slot, setSlot] = useState('09:00 - 09:50');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-textPrimary dark:text-white">Take Attendance</h1>
        <p className="text-textSecondary dark:text-gray-400">Mark attendance for ongoing classes.</p>
      </div>

      <Card>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-textSecondary dark:text-gray-400 mb-1">
              Class
            </label>
            <select
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              {classes.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-textSecondary dark:text-gray-400 mb-1">Date</label>
            <input
              type="date"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-textSecondary dark:text-gray-400 mb-1">Slot</label>
            <select
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800"
              value={slot}
              onChange={(e) => setSlot(e.target.value)}
            >
              <option>09:00 - 09:50</option>
              <option>10:00 - 10:50</option>
              <option>11:00 - 11:50</option>
              <option>13:30 - 14:20</option>
            </select>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <Button variant="outline">Load Previous</Button>
          <Button variant="primary">Save Attendance</Button>
        </div>
      </Card>

      <Card>
        <Table headers={['ID', 'Student', 'Status']} data={sampleStudents} />
      </Card>
    </div>
  );
};

export default Attendance;

