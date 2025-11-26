import { useState } from 'react';
import { Clock, MapPin, User, Edit } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import Modal from '../components/Modal';
import { useAuth } from '../context/AuthContext';

const Timetable = () => {
  const [selectedClass, setSelectedClass] = useState(null);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const { user } = useAuth();
  const isTeacher = user?.role === 'Teacher' || user?.role === 'Admin';

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const timeSlots = ['9:15 AM', '10:15 AM', '11:15 AM', '11:30 AM', '12:30 PM', '1:30 PM', '2:15 PM', '3:15 PM'];

  const timetable = {
    Monday: [
      { subject: 'SE & PM', teacher: 'Prof. Shashikala R.D.', room: 'Room 205', time: '9:15 AM - 10:15 AM' },
      { subject: 'EVS', teacher: 'Prof. Sandhya K.', room: 'Room 205', time: '10:15 AM - 11:15 AM' },
      { subject: '', teacher: '', room: '', time: '11:15 AM - 11:30 AM', isBreak: true },
      { subject: 'UNIX', teacher: 'Prof. Rakhi Patil', room: 'Room 205', time: '11:30 AM - 12:30 PM' },
      { subject: 'TOC', teacher: 'Prof. Sneha K.', room: 'Room 205', time: '12:30 PM - 1:30 PM' },
      { subject: 'Lunch Break', teacher: '-', room: 'Cafeteria', time: '1:30 PM - 2:15 PM', isBreak: true },
      { subject: 'DUTE', teacher: '-', room: 'Room 205', time: '2:15 PM - 3:15 PM' },
      { subject: '', teacher: '', room: '', time: '3:15 PM - 4:15 PM', isBreak: true },
    ],
    Tuesday: [
      { subject: 'TOC', teacher: 'Prof. Sneha K.', room: 'Room 205', time: '9:15 AM - 10:15 AM' },
      { subject: 'SE & PM', teacher: 'Prof. Shashikala R.D.', room: 'Room 205', time: '10:15 AM - 11:15 AM' },
      { subject: '', teacher: '', room: '', time: '11:15 AM - 11:30 AM', isBreak: true },
      { subject: 'UNIX', teacher: 'Prof. Rakhi Patil', room: 'Room 205', time: '11:30 AM - 12:30 PM' },
      { subject: 'UNIX', teacher: 'Prof. Rakhi Patil', room: 'Room 205', time: '12:30 PM - 1:30 PM' },
      { subject: 'Lunch Break', teacher: '-', room: 'Cafeteria', time: '1:30 PM - 2:15 PM', isBreak: true },
      { subject: 'Data Visualization Lab', teacher: 'Prof. Sneha K.', room: 'Lab [B1] R.NO:212', time: '2:15 PM - 4:15 PM' },
      { subject: '', teacher: '', room: '', time: '', isBreak: true },
    ],
    Wednesday: [
      { subject: 'UNIX', teacher: 'Prof. Rakhi Patil', room: 'Room 205', time: '9:15 AM - 10:15 AM' },
      { subject: 'TOC', teacher: 'Prof. Sneha K.', room: 'Room 205', time: '10:15 AM - 11:15 AM' },
      { subject: '', teacher: '', room: '', time: '11:15 AM - 11:30 AM', isBreak: true },
      { subject: 'SE & PM', teacher: 'Prof. Shashikala R.D.', room: 'Room 205', time: '11:30 AM - 12:30 PM' },
      { subject: 'RM & IPR', teacher: 'Prof. Pallavi Dixit', room: 'Room 205', time: '12:30 PM - 1:30 PM' },
      { subject: 'Lunch Break', teacher: '-', room: 'Cafeteria', time: '1:30 PM - 2:15 PM', isBreak: true },
      { subject: 'Data Visualization Lab', teacher: 'Prof. Sneha K.', room: 'Lab [B2] R.NO:212', time: '2:15 PM - 4:15 PM' },
      { subject: '', teacher: '', room: '', time: '', isBreak: true },
    ],
    Thursday: [
      { subject: 'TOC', teacher: 'Prof. Sneha K.', room: 'Room 205', time: '9:15 AM - 10:15 AM' },
      { subject: 'CN', teacher: 'Dr. Prakash K Sonwalkar', room: 'Room 205', time: '10:15 AM - 11:15 AM' },
      { subject: '', teacher: '', room: '', time: '11:15 AM - 11:30 AM', isBreak: true },
      { subject: 'RM & IPR', teacher: 'Prof. Pallavi Dixit', room: 'Room 205', time: '11:30 AM - 12:30 PM' },
      { subject: 'CN', teacher: 'Dr. Prakash K Sonwalkar', room: 'Room 205', time: '12:30 PM - 1:30 PM' },
      { subject: 'Lunch Break', teacher: '-', room: 'Cafeteria', time: '1:30 PM - 2:15 PM', isBreak: true },
      { subject: 'CN Lab [B1 & B2]', teacher: 'Dr. Prakash K Sonwalkar', room: 'Lab R.NO:204', time: '2:15 PM - 4:15 PM' },
      { subject: '', teacher: '', room: '', time: '', isBreak: true },
    ],
    Friday: [
      { subject: 'UNIX', teacher: 'Prof. Rakhi Patil', room: 'Room 205', time: '9:15 AM - 10:15 AM' },
      { subject: 'UNIX', teacher: 'Prof. Rakhi Patil', room: 'Room 205', time: '10:15 AM - 11:15 AM' },
      { subject: '', teacher: '', room: '', time: '11:15 AM - 11:30 AM', isBreak: true },
      { subject: 'RM & IPR', teacher: 'Prof. Pallavi Dixit', room: 'Room 205', time: '11:30 AM - 12:30 PM' },
      { subject: 'CN', teacher: 'Dr. Prakash K Sonwalkar', room: 'Room 205', time: '12:30 PM - 1:30 PM' },
      { subject: 'Lunch Break', teacher: '-', room: 'Cafeteria', time: '1:30 PM - 2:15 PM', isBreak: true },
      { subject: 'DUTE', teacher: '-', room: 'Room 205', time: '2:15 PM - 3:15 PM' },
      { subject: '', teacher: '', room: '', time: '3:15 PM - 4:15 PM', isBreak: true },
    ],
    Saturday: [
      { subject: 'RM & IPR', teacher: 'Prof. Pallavi Dixit', room: 'Room 205', time: '9:15 AM - 10:15 AM' },
      { subject: 'TOC', teacher: 'Prof. Sneha K.', room: 'Room 205', time: '10:15 AM - 11:15 AM' },
      { subject: '', teacher: '', room: '', time: '11:15 AM - 11:30 AM', isBreak: true },
      { subject: 'SE & PM', teacher: 'Prof. Shashikala R.D.', room: 'Room 205', time: '11:30 AM - 12:30 PM' },
      { subject: 'CN', teacher: 'Dr. Prakash K Sonwalkar', room: 'Room 205', time: '12:30 PM - 1:30 PM' },
      { subject: 'Lunch Break', teacher: '-', room: 'Cafeteria', time: '1:30 PM - 2:15 PM', isBreak: true },
      { subject: 'Departmental Activities', teacher: '-', room: 'Room 205', time: '2:15 PM - 4:15 PM' },
      { subject: '', teacher: '', room: '', time: '', isBreak: true },
    ],
  };

  const getSubjectColor = (subject) => {
    if (subject.includes('Break') || subject === '') return 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400';
    if (subject === 'DUTE' || subject === 'Departmental Activities') return 'bg-pink-100 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400 border-l-4 border-pink-600';
    
    const colors = {
      'SE & PM': 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-l-4 border-green-600',
      'EVS': 'bg-teal-100 dark:bg-teal-900/20 text-teal-700 dark:text-teal-400 border-l-4 border-teal-600',
      'UNIX': 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-l-4 border-blue-600',
      'TOC': 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 border-l-4 border-yellow-600',
      'CN': 'bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 border-l-4 border-orange-600',
      'RM & IPR': 'bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 border-l-4 border-purple-600',
      'Data Visualization Lab': 'bg-indigo-100 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400 border-l-4 border-indigo-600',
      'CN Lab [B1 & B2]': 'bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 border-l-4 border-orange-600',
    };
    return colors[subject] || 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-l-4 border-gray-400';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-textPrimary dark:text-white">
            Timetable
          </h1>
          <p className="text-textSecondary dark:text-gray-400 mt-1">
            Weekly class schedule
          </p>
        </div>
        {isTeacher && (
          <Button
            variant={isAdminMode ? 'primary' : 'outline'}
            onClick={() => setIsAdminMode(!isAdminMode)}
          >
            <Edit size={20} />
            {isAdminMode ? 'Exit Edit Mode' : 'Edit Mode'}
          </Button>
        )}
      </div>

      {/* Current Class */}
      <Card>
        <div className="flex items-center gap-4">
          <div className="bg-primary p-4 rounded-lg">
            <Clock className="text-white" size={32} />
          </div>
          <div className="flex-1">
            <p className="text-sm text-textSecondary dark:text-gray-400">Current Class</p>
            <h3 className="text-2xl font-bold text-textPrimary dark:text-white">
              SE & PM
            </h3>
            <p className="text-textSecondary dark:text-gray-400">
              Prof. Shashikala R.D. • Room 205 • 9:15 AM - 10:15 AM
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-textSecondary dark:text-gray-400">Next Class</p>
            <p className="font-semibold text-textPrimary dark:text-white">EVS</p>
            <p className="text-sm text-textSecondary dark:text-gray-400">in 45 minutes</p>
          </div>
        </div>
      </Card>

      {/* Timetable Grid */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200 dark:border-gray-700">
                <th className="p-4 text-left text-textPrimary dark:text-white font-semibold">
                  Time
                </th>
                {days.map(day => (
                  <th key={day} className="p-4 text-left text-textPrimary dark:text-white font-semibold">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timeSlots.map((time, timeIndex) => (
                <tr key={time} className="border-b border-gray-200 dark:border-gray-700">
                  <td className="p-4 text-textSecondary dark:text-gray-400 font-medium whitespace-nowrap">
                    {time}
                  </td>
                  {days.map(day => {
                    const classInfo = timetable[day][timeIndex];
                    return (
                      <td key={day} className="p-2">
                        <div
                          onClick={() => !classInfo.isBreak && setSelectedClass(classInfo)}
                          className={`p-3 rounded-lg ${getSubjectColor(classInfo.subject)} ${
                            !classInfo.isBreak ? 'cursor-pointer hover:shadow-md transition-shadow' : ''
                          }`}
                        >
                          <p className="font-semibold text-sm mb-1">{classInfo.subject}</p>
                          {!classInfo.isBreak && (
                            <>
                              <p className="text-xs opacity-80">{classInfo.teacher}</p>
                              <p className="text-xs opacity-80">{classInfo.room}</p>
                            </>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Class Details Modal */}
      <Modal
        isOpen={!!selectedClass}
        onClose={() => setSelectedClass(null)}
        title="Class Details"
        size="md"
      >
        {selectedClass && (
          <div className="space-y-4">
            <div className={`p-6 rounded-lg ${getSubjectColor(selectedClass.subject)}`}>
              <h3 className="text-2xl font-bold mb-2">{selectedClass.subject}</h3>
              <p className="opacity-80">{selectedClass.time}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <User className="text-textSecondary dark:text-gray-400 mt-1" size={20} />
                <div>
                  <p className="text-sm text-textSecondary dark:text-gray-400">Teacher</p>
                  <p className="font-semibold text-textPrimary dark:text-white">
                    {selectedClass.teacher}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="text-textSecondary dark:text-gray-400 mt-1" size={20} />
                <div>
                  <p className="text-sm text-textSecondary dark:text-gray-400">Location</p>
                  <p className="font-semibold text-textPrimary dark:text-white">
                    {selectedClass.room}
                  </p>
                </div>
              </div>
            </div>
            {isAdminMode && (
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <Button className="w-full" variant="outline">
                  <Edit size={20} />
                  Edit Class Details
                </Button>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Timetable;
