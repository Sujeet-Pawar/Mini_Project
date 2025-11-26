import Card from '@/components/Card';
import Button from '@/components/Button';
import Table from '@/components/Table';
import { CalendarDays, Users, ClipboardList, Award } from 'lucide-react';

const stats = [
  { label: 'Today’s Classes', value: 5, icon: CalendarDays, color: 'bg-primary' },
  { label: 'Students', value: 142, icon: Users, color: 'bg-secondary' },
  { label: 'Pending Reviews', value: 12, icon: ClipboardList, color: 'bg-accent' },
  { label: 'Achievements', value: 6, icon: Award, color: 'bg-success' }
];

const scheduleHeaders = ['Time', 'Subject', 'Class', 'Room'];
const scheduleRows = [
  ['09:00 - 09:50', 'Software Engineering', 'SE 5th Sem', 'Room 304'],
  ['10:00 - 10:50', 'Machine Learning', 'AIML 5th Sem', 'Lab 2'],
  ['11:00 - 11:50', 'Project Guidance', 'Final Year', 'Innovation Hub'],
  ['13:30 - 14:20', 'Mentor Meeting', 'Group A', 'Conference Room']
];

const FacultyDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-textPrimary dark:text-white">Faculty Dashboard</h1>
          <p className="text-textSecondary dark:text-gray-400 mt-1">
            Track teaching schedule, submissions, and student performance.
          </p>
        </div>
        <Button variant="primary" className="whitespace-nowrap">
          Create Announcement
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((item) => (
          <Card key={item.label}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-textSecondary dark:text-gray-400 text-sm">{item.label}</p>
                <p className="text-3xl font-bold text-textPrimary dark:text-white mt-2">{item.value}</p>
              </div>
              <div className={`${item.color} p-3 rounded-lg text-white`}>
                <item.icon size={28} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-textPrimary dark:text-white">Today’s Schedule</h2>
              <p className="text-sm text-textSecondary dark:text-gray-400">Stay prepared for each session</p>
            </div>
            <Button variant="outline" size="sm">
              Export
            </Button>
          </div>
          <Table headers={scheduleHeaders} data={scheduleRows} />
        </Card>

        <Card>
          <h2 className="text-xl font-semibold text-textPrimary dark:text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="secondary">Take Attendance</Button>
            <Button variant="secondary">Upload Notes</Button>
            <Button variant="secondary">Review Assignments</Button>
            <Button variant="secondary">Schedule Meeting</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default FacultyDashboard;

