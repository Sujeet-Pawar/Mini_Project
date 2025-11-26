import Card from '@/components/Card';
import Table from '@/components/Table';
import { CalendarClock } from 'lucide-react';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const slots = [
  { time: '09:00 - 09:50', subjects: ['SE', 'ML', 'AI Ethics', 'SE', 'Research'] },
  { time: '10:00 - 10:50', subjects: ['UNIX', 'Project', 'ML Lab', 'Guidance', 'AI Ethics'] },
  { time: '11:00 - 11:50', subjects: ['Mentoring', 'SE', 'Seminar', 'ML', 'Capstone'] },
  { time: '13:30 - 14:20', subjects: ['Lab Prep', 'Mentoring', 'Research', 'Lab Prep', 'Evaluation'] }
];

const Timetable = () => {
  const headers = ['Time', ...days];
  const data = slots.map((slot) => [slot.time, ...slot.subjects]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <CalendarClock className="text-primary" size={32} />
        <div>
          <h1 className="text-3xl font-bold text-textPrimary dark:text-white">Weekly Timetable</h1>
          <p className="text-textSecondary dark:text-gray-400">Overview of classes and mentoring slots.</p>
        </div>
      </div>

      <Card>
        <Table headers={headers} data={data} />
      </Card>
    </div>
  );
};

export default Timetable;

