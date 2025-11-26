import RoleLayout from '@/features/shared/layouts/RoleLayout';
import { LayoutDashboard, Users, BookOpen, Calendar, Settings, User, BarChart2, FileText } from 'lucide-react';

const basePath = '/admin';

const adminMenuItems = [
  { path: `${basePath}/dashboard`, icon: LayoutDashboard, label: 'Dashboard' },
  { path: `${basePath}/users`, icon: Users, label: 'User Management' },
  { path: `${basePath}/courses`, icon: BookOpen, label: 'Course Management' },
  { path: `${basePath}/schedule`, icon: Calendar, label: 'Class Scheduling' },
  { path: `${basePath}/reports`, icon: BarChart2, label: 'Reports' },
  { path: `${basePath}/attendance`, icon: FileText, label: 'Attendance' },
  { path: `${basePath}/settings`, icon: Settings, label: 'System Settings' },
  { path: `${basePath}/profile`, icon: User, label: 'Profile' }
];

const AdminLayout = () => {
  return <RoleLayout menuItems={adminMenuItems} />;
};

export default AdminLayout;
