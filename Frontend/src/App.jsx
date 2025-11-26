import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from '@/features/auth/pages/Login';
import Register from '@/features/auth/pages/Register';

import StudentLayout from '@/features/student/layouts/StudentLayout';
import StudentDashboard from '@/features/student/pages/Dashboard';
import StudentTimetable from '@/features/student/pages/Timetable';
import StudentAttendance from '@/features/student/pages/Attendance';
import StudentNotes from '@/features/student/pages/Notes';
import StudentBusTracking from '@/features/student/pages/BusTracking';
import StudentAssignments from '@/features/student/pages/Assignments';
import StudentResults from '@/features/student/pages/Results';
import StudentAchievements from '@/features/student/pages/Achievements';
import StudentProfile from '@/features/shared/pages/Profile';

import FacultyLayout from '@/features/faculty/layouts/FacultyLayout';
import FacultyDashboard from '@/features/faculty/pages/Dashboard';
import FacultyTimetable from '@/features/faculty/pages/Timetable';
import FacultyAttendance from '@/features/faculty/pages/Attendance';
import FacultyStudents from '@/features/faculty/pages/Students';
import FacultyMaterials from '@/features/faculty/pages/Materials';
import FacultyAssignments from '@/features/faculty/pages/Assignments';
import FacultyGrading from '@/features/faculty/pages/Grading';
import FacultyProfile from '@/features/faculty/pages/Profile';

import AdminLayout from '@/features/admin/layouts/AdminLayout';
import AdminDashboard from '@/features/admin/pages/Dashboard';
import AdminUsers from '@/features/admin/pages/Users';
import AdminCourses from '@/features/admin/pages/Courses';
import AdminSchedule from '@/features/admin/pages/Schedule';
import AdminReports from '@/features/admin/pages/Reports';
import AdminAttendance from '@/features/admin/pages/Attendance';
import AdminSettings from '@/features/admin/pages/Settings';
import AdminProfile from '@/features/admin/pages/Profile';

const LoadingScreen = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
    <div className="flex flex-col items-center gap-4">
      <span className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      <p className="text-gray-600 dark:text-gray-300 font-medium">Loading...</p>
    </div>
  </div>
);

const ProtectedRoute = ({ children }) => {
  const { user, status } = useAuth();

  if (status === 'idle' || status === 'loading') {
    return <LoadingScreen />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const RoleRoute = ({ allowedRoles, children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    const redirectMap = {
      Student: '/student/dashboard',
      Faculty: '/faculty/dashboard',
      Admin: '/admin/dashboard'
    };
    return <Navigate to={redirectMap[user.role] || '/login'} replace />;
  }

  return children;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />

    <Route
      path="/student/*"
      element={
        <ProtectedRoute>
          <RoleRoute allowedRoles={['Student']}>
            <StudentLayout />
          </RoleRoute>
        </ProtectedRoute>
      }
    >
      <Route index element={<Navigate to="dashboard" replace />} />
      <Route path="dashboard" element={<StudentDashboard />} />
      <Route path="timetable" element={<StudentTimetable />} />
      <Route path="attendance" element={<StudentAttendance />} />
      <Route path="notes" element={<StudentNotes />} />
      <Route path="bus-tracking" element={<StudentBusTracking />} />
      <Route path="assignments" element={<StudentAssignments />} />
      <Route path="results" element={<StudentResults />} />
      <Route path="achievements" element={<StudentAchievements />} />
      <Route path="profile" element={<StudentProfile />} />
      <Route path="*" element={<Navigate to="dashboard" replace />} />
    </Route>

    <Route
      path="/faculty/*"
      element={
        <ProtectedRoute>
          <RoleRoute allowedRoles={['Faculty']}>
            <FacultyLayout />
          </RoleRoute>
        </ProtectedRoute>
      }
    >
      <Route index element={<Navigate to="dashboard" replace />} />
      <Route path="dashboard" element={<FacultyDashboard />} />
      <Route path="timetable" element={<FacultyTimetable />} />
      <Route path="attendance" element={<FacultyAttendance />} />
      <Route path="students" element={<FacultyStudents />} />
      <Route path="materials" element={<FacultyMaterials />} />
      <Route path="assignments" element={<FacultyAssignments />} />
      <Route path="grading" element={<FacultyGrading />} />
      <Route path="profile" element={<FacultyProfile />} />
      <Route path="*" element={<Navigate to="dashboard" replace />} />
    </Route>

    <Route
      path="/admin/*"
      element={
        <ProtectedRoute>
          <RoleRoute allowedRoles={['Admin']}>
            <AdminLayout />
          </RoleRoute>
        </ProtectedRoute>
      }
    >
      <Route index element={<Navigate to="dashboard" replace />} />
      <Route path="dashboard" element={<AdminDashboard />} />
      <Route path="users" element={<AdminUsers />} />
      <Route path="courses" element={<AdminCourses />} />
      <Route path="schedule" element={<AdminSchedule />} />
      <Route path="reports" element={<AdminReports />} />
      <Route path="attendance" element={<AdminAttendance />} />
      <Route path="settings" element={<AdminSettings />} />
      <Route path="profile" element={<AdminProfile />} />
      <Route path="*" element={<Navigate to="dashboard" replace />} />
    </Route>

    <Route path="/" element={<Navigate to="/login" replace />} />
    <Route path="*" element={<Navigate to="/login" replace />} />
  </Routes>
);

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
