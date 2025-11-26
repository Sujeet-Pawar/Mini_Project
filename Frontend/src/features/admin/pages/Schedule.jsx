import { useState } from 'react';
import { Calendar, Plus, Clock, MapPin, Users } from 'lucide-react';
import Card from '@/components/Card';
import Button from '@/components/Button';

const Schedule = () => {
  const schedules = [
    {
      id: 1,
      class: 'CSE 3A',
      subject: 'Database Management Systems',
      faculty: 'Prof. Shashikala R.D.',
      time: '09:00 - 10:00',
      room: 'Lab 101',
      day: 'Monday'
    },
    {
      id: 2,
      class: 'CSE 3B',
      subject: 'Data Structures',
      faculty: 'Prof. John Doe',
      time: '10:15 - 11:15',
      room: 'Room 205',
      day: 'Monday'
    },
    {
      id: 3,
      class: 'CSE 3A',
      subject: 'Web Technologies',
      faculty: 'Prof. Jane Smith',
      time: '11:30 - 12:30',
      room: 'Lab 102',
      day: 'Monday'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-textPrimary dark:text-white">Class Scheduling</h1>
          <p className="text-textSecondary dark:text-gray-400 mt-1">
            Manage class timetables and schedules
          </p>
        </div>
        <Button>
          <Plus size={20} />
          Create Schedule
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {schedules.map((schedule) => (
          <Card key={schedule.id} hover={true}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-4 rounded-lg">
                  <Calendar className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-textPrimary dark:text-white">
                    {schedule.subject}
                  </h3>
                  <div className="flex items-center gap-4 mt-2 text-sm text-textSecondary dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <Users size={16} />
                      {schedule.class}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} />
                      {schedule.time}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} />
                      {schedule.room}
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-textSecondary dark:text-gray-400">Faculty</p>
                <p className="font-semibold text-textPrimary dark:text-white">{schedule.faculty}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Schedule;

