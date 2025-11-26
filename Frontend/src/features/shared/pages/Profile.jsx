import { useState } from 'react';
import { Edit, Mail, Phone, MapPin, Calendar, Award, BookOpen } from 'lucide-react';
import Card from '@/components/Card';
import Button from '@/components/Button';
import ChartWidget from '@/components/ChartWidget';
import { useAuth } from '@/context/AuthContext';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const profileData = {
    name: user?.name || 'User',
    email: user?.email || 'unknown@college.edu',
    phone: user?.phone || '+00 0000 000000',
    address: user?.metadata?.address || 'Not provided',
    dateOfBirth: user?.metadata?.dateOfBirth || 'N/A',
    id: user?.id || user?._id || 'N/A',
    department: user?.department || 'General Studies',
    year: user?.year ? `${user.year}${user.year === 1 ? 'st' : user.year === 2 ? 'nd' : user.year === 3 ? 'rd' : 'th'} Year` : 'N/A',
    semester: user?.metadata?.semester || 'N/A',
    enrollmentDate: user?.metadata?.enrollmentDate || 'N/A',
    role: user?.role || 'Student'
  };

  const attendanceData = [
    { name: 'Jan', attendance: 92 },
    { name: 'Feb', attendance: 88 },
    { name: 'Mar', attendance: 95 },
    { name: 'Apr', attendance: 87 },
    { name: 'May', attendance: 90 },
    { name: 'Jun', attendance: 93 },
  ];

  const achievements = [
    { title: 'Perfect Attendance', date: '2024-01-15' },
    { title: 'Academic Excellence', date: '2024-01-10' },
    { title: 'Top Performer', date: '2024-01-05' },
  ];

  const stats = [
    { label: 'SGPA', value: '8.5', icon: BookOpen, color: 'bg-primary' },
    { label: 'Attendance', value: '87%', icon: Calendar, color: 'bg-success' },
    { label: 'Achievements', value: '12', icon: Award, color: 'bg-accent' },
    { label: 'Class Rank', value: '#5', icon: Award, color: 'bg-secondary' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-textPrimary dark:text-white">
            Profile
          </h1>
          <p className="text-textSecondary dark:text-gray-400 mt-1">
            Manage your personal information
          </p>
        </div>
        <Button
          variant={isEditing ? 'primary' : 'outline'}
          onClick={() => setIsEditing(!isEditing)}
        >
          <Edit size={20} />
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card>
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-4xl font-bold">
              {profileData.name
                .split(' ')
                .filter(Boolean)
                .map((n) => n[0])
                .join('')
                .toUpperCase() || 'U'}
            </div>
            <h2 className="text-2xl font-bold text-textPrimary dark:text-white mb-1">
              {profileData.name}
            </h2>
            <p className="text-textSecondary dark:text-gray-400 mb-2">{profileData.id}</p>
            <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
              {profileData.department}
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 space-y-4">
            <div className="flex items-center gap-3 text-sm">
              <Mail className="text-textSecondary dark:text-gray-400" size={18} />
              <span className="text-textPrimary dark:text-white">{profileData.email}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Phone className="text-textSecondary dark:text-gray-400" size={18} />
              <span className="text-textPrimary dark:text-white">{profileData.phone}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <MapPin className="text-textSecondary dark:text-gray-400" size={18} />
              <span className="text-textPrimary dark:text-white">{profileData.address}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Calendar className="text-textSecondary dark:text-gray-400" size={18} />
              <span className="text-textPrimary dark:text-white">
                Born: {profileData.dateOfBirth}
              </span>
            </div>
          </div>
        </Card>

        {/* Details and Stats */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <Card key={index}>
                <div className="text-center">
                  <div className={`${stat.color} w-12 h-12 mx-auto mb-3 rounded-lg flex items-center justify-center`}>
                    <stat.icon className="text-white" size={24} />
                  </div>
                  <p className="text-2xl font-bold text-textPrimary dark:text-white">
                    {stat.value}
                  </p>
                  <p className="text-sm text-textSecondary dark:text-gray-400">
                    {stat.label}
                  </p>
                </div>
              </Card>
            ))}
          </div>

          {/* Academic Information */}
          <Card>
            <h3 className="text-lg font-semibold mb-4 text-textPrimary dark:text-white">
              Academic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-textSecondary dark:text-gray-400 mb-1">
                  Department
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    defaultValue={profileData.department}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-textPrimary dark:text-white"
                  />
                ) : (
                  <p className="font-semibold text-textPrimary dark:text-white">
                    {profileData.department}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm text-textSecondary dark:text-gray-400 mb-1">
                  Year
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    defaultValue={profileData.year}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-textPrimary dark:text-white"
                  />
                ) : (
                  <p className="font-semibold text-textPrimary dark:text-white">
                    {profileData.year}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm text-textSecondary dark:text-gray-400 mb-1">
                  Semester
                </label>
                <p className="font-semibold text-textPrimary dark:text-white">
                  {profileData.semester}
                </p>
              </div>
              <div>
                <label className="block text-sm text-textSecondary dark:text-gray-400 mb-1">
                  Enrollment Date
                </label>
                <p className="font-semibold text-textPrimary dark:text-white">
                  {profileData.enrollmentDate}
                </p>
              </div>
            </div>
          </Card>

          {/* Personal Information */}
          <Card>
            <h3 className="text-lg font-semibold mb-4 text-textPrimary dark:text-white">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-textSecondary dark:text-gray-400 mb-1">
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    defaultValue={profileData.name}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-textPrimary dark:text-white"
                  />
                ) : (
                  <p className="font-semibold text-textPrimary dark:text-white">
                    {profileData.name}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm text-textSecondary dark:text-gray-400 mb-1">
                  Email
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    defaultValue={profileData.email}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-textPrimary dark:text-white"
                  />
                ) : (
                  <p className="font-semibold text-textPrimary dark:text-white">
                    {profileData.email}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm text-textSecondary dark:text-gray-400 mb-1">
                  Phone
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    defaultValue={profileData.phone}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-textPrimary dark:text-white"
                  />
                ) : (
                  <p className="font-semibold text-textPrimary dark:text-white">
                    {profileData.phone}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm text-textSecondary dark:text-gray-400 mb-1">
                  Date of Birth
                </label>
                <p className="font-semibold text-textPrimary dark:text-white">
                  {profileData.dateOfBirth}
                </p>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-textSecondary dark:text-gray-400 mb-1">
                  Address
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    defaultValue={profileData.address}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-textPrimary dark:text-white"
                  />
                ) : (
                  <p className="font-semibold text-textPrimary dark:text-white">
                    {profileData.address}
                  </p>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Attendance Chart and Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartWidget
          title="Attendance Overview (Last 6 Months)"
          data={attendanceData}
          type="bar"
          dataKey="attendance"
        />

        <Card>
          <h3 className="text-lg font-semibold mb-4 text-textPrimary dark:text-white">
            Recent Achievements
          </h3>
          <div className="space-y-4">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="bg-accent p-2 rounded-lg">
                  <Award className="text-white" size={20} />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-textPrimary dark:text-white">
                    {achievement.title}
                  </p>
                  <p className="text-sm text-textSecondary dark:text-gray-400">
                    {achievement.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
