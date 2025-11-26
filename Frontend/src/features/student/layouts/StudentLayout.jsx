import RoleLayout from '@/features/shared/layouts/RoleLayout';
import { LayoutDashboard, Clock, Calendar, FileText, Bus, ClipboardList, Award, Trophy, User } from 'lucide-react';

const basePath = '/student';

const studentMenuItems = [
  { path: `${basePath}/dashboard`, icon: LayoutDashboard, label: 'Dashboard' },
  { path: `${basePath}/timetable`, icon: Clock, label: 'Timetable' },
  { path: `${basePath}/attendance`, icon: Calendar, label: 'Attendance' },
  { path: `${basePath}/notes`, icon: FileText, label: 'Notes' },
  { path: `${basePath}/bus-tracking`, icon: Bus, label: 'Bus Tracking' },
  { path: `${basePath}/assignments`, icon: ClipboardList, label: 'Assignments' },
  { path: `${basePath}/results`, icon: Award, label: 'Results' },
  { path: `${basePath}/achievements`, icon: Trophy, label: 'Achievements' },
  { path: `${basePath}/profile`, icon: User, label: 'Profile' }
];

const StudentLayout = () => {
  return <RoleLayout menuItems={studentMenuItems} />;
};

export default StudentLayout;
