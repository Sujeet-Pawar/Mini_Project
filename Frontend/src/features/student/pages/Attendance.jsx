import { useState } from 'react';
import { Camera, CheckCircle, XCircle, Calendar } from 'lucide-react';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Table from '@/components/Table';
import { useToast } from '@/hooks/useToast';
import ToastNotification from '@/components/ToastNotification';
import { useAuth } from '@/context/AuthContext';

const Attendance = () => {
  const [status, setStatus] = useState(null);
  const { toasts, showToast, removeToast } = useToast();
  const { user } = useAuth();
  const isTeacher = user?.role === 'Teacher' || user?.role === 'Admin';

  const attendanceLog = [
    ['2025-10-24', 'SE & PM', 'Present', '09:15 AM'],
    ['2025-10-24', 'EVS', 'Present', '10:15 AM'],
    ['2025-10-24', 'UNIX', 'Present', '11:30 AM'],
    ['2025-10-23', 'TOC', 'Present', '09:15 AM'],
    ['2025-10-23', 'CN', 'Absent', '10:15 AM'],
    ['2025-10-22', 'RM & IPR', 'Present', '11:30 AM'],
    ['2025-10-22', 'Data Visualization Lab', 'Present', '02:15 PM'],
    ['2025-10-21', 'UNIX', 'Present', '09:15 AM'],
    ['2025-10-21', 'TOC', 'Present', '10:15 AM'],
  ];

  const handleMarkAttendance = () => {
    setStatus('present');
    showToast('Attendance marked successfully!', 'success');
    setTimeout(() => setStatus(null), 3000);
  };

  const handleScanID = () => {
    showToast('Scanning ID...', 'info');
    setTimeout(() => {
      setStatus('present');
      showToast('ID verified! Attendance marked.', 'success');
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <ToastNotification toasts={toasts} removeToast={removeToast} />
      
      <div>
        <h1 className="text-3xl font-bold text-textPrimary dark:text-white">
          Attendance
        </h1>
        <p className="text-textSecondary dark:text-gray-400 mt-1">
          Mark your attendance and view history
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Camera Preview */}
        <div className="lg:col-span-2">
          <Card>
            <h3 className="text-lg font-semibold mb-4 text-textPrimary dark:text-white">
              Camera Preview
            </h3>
            <div className="bg-gray-900 rounded-lg aspect-video flex items-center justify-center relative overflow-hidden">
              <Camera className="text-gray-600" size={64} />
              <div className="absolute inset-0 border-4 border-primary/50 rounded-lg animate-pulse" />
            </div>

            {isTeacher ? (
              <div className="mt-6 flex gap-4">
                <Button onClick={handleMarkAttendance} className="flex-1">
                  <CheckCircle size={20} />
                  Mark Attendance
                </Button>
                <Button onClick={handleScanID} variant="secondary" className="flex-1">
                  <Camera size={20} />
                  Scan ID
                </Button>
              </div>
            ) : (
              <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg text-center">
                <p className="text-textSecondary dark:text-gray-400">
                  Only teachers can mark attendance
                </p>
              </div>
            )}

            {status && (
              <div className={`mt-4 p-4 rounded-lg flex items-center gap-3 ${
                status === 'present' 
                  ? 'bg-success/10 text-success' 
                  : 'bg-error/10 text-error'
              }`}>
                {status === 'present' ? (
                  <CheckCircle size={24} />
                ) : (
                  <XCircle size={24} />
                )}
                <div>
                  <p className="font-semibold">
                    {status === 'present' ? 'Present' : 'Please Retry'}
                  </p>
                  <p className="text-sm opacity-80">
                    {status === 'present' 
                      ? 'Your attendance has been marked successfully' 
                      : 'Face not recognized. Please try again'}
                  </p>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Stats */}
        <div className="space-y-6">
          <Card>
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="text-primary" size={24} />
              <h3 className="text-lg font-semibold text-textPrimary dark:text-white">
                This Month
              </h3>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-textSecondary dark:text-gray-400">Present</span>
                  <span className="font-semibold text-success">18 days</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-success h-2 rounded-full" style={{ width: '90%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-textSecondary dark:text-gray-400">Absent</span>
                  <span className="font-semibold text-error">2 days</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-error h-2 rounded-full" style={{ width: '10%' }} />
                </div>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <span className="text-textSecondary dark:text-gray-400">Overall</span>
                <span className="text-2xl font-bold text-primary">87%</span>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold mb-4 text-textPrimary dark:text-white">
              Quick Stats
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-textSecondary dark:text-gray-400">Total Classes</span>
                <span className="font-semibold text-textPrimary dark:text-white">120</span>
              </div>
              <div className="flex justify-between">
                <span className="text-textSecondary dark:text-gray-400">Attended</span>
                <span className="font-semibold text-success">104</span>
              </div>
              <div className="flex justify-between">
                <span className="text-textSecondary dark:text-gray-400">Missed</span>
                <span className="font-semibold text-error">16</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Attendance Log */}
      <Card>
        <h3 className="text-lg font-semibold mb-4 text-textPrimary dark:text-white">
          Attendance History
        </h3>
        <Table
          headers={['Date', 'Subject', 'Status', 'Time']}
          data={attendanceLog}
        />
      </Card>
    </div>
  );
};

export default Attendance;
