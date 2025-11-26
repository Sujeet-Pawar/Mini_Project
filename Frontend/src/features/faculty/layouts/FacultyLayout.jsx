import RoleLayout from '@/features/shared/layouts/RoleLayout';
import { LayoutDashboard, Clock, Calendar, FileText, Users, BookOpen, FileCheck, User } from 'lucide-react';

const basePath = '/faculty';

const facultyMenuItems = [
  { path: `${basePath}/dashboard`, icon: LayoutDashboard, label: 'Dashboard' },
  { path: `${basePath}/timetable`, icon: Clock, label: 'Timetable' },
  { path: `${basePath}/attendance`, icon: Calendar, label: 'Take Attendance' },
  { path: `${basePath}/students`, icon: Users, label: 'Students' },
  { path: `${basePath}/materials`, icon: FileText, label: 'Teaching Materials' },
  { path: `${basePath}/assignments`, icon: BookOpen, label: 'Assignments' },
  { path: `${basePath}/grading`, icon: FileCheck, label: 'Grading' },
  { path: `${basePath}/profile`, icon: User, label: 'Profile' }
];

const FacultyLayout = () => {
  return <RoleLayout menuItems={facultyMenuItems} />;
};

export default FacultyLayout;
