import { useState } from 'react';
import { Edit, Mail, Phone, MapPin, Calendar, BookOpen, Award } from 'lucide-react';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { useAuth } from '@/context/AuthContext';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const profileData = {
    name: user?.name || 'Prof. Shashikala R.D.',
    email: user?.email || 'shashikala.rd@college.edu',
    phone: user?.phone || '+91 98765 43210',
    department: user?.department || 'Computer Science & Engineering',
    employeeId: 'FAC2024001',
    designation: 'Associate Professor',
    experience: '15 years',
    specialization: 'Database Systems, Web Technologies'
  };

  const stats = [
    { label: 'Classes', value: '8', icon: BookOpen, color: 'bg-primary' },
    { label: 'Students', value: '240', icon: Award, color: 'bg-success' },
    { label: 'Years', value: '15', icon: Calendar, color: 'bg-accent' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-textPrimary dark:text-white">Profile</h1>
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
        <Card>
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-4xl font-bold">
              {profileData.name.split(' ').map((n) => n[0]).join('')}
            </div>
            <h2 className="text-2xl font-bold text-textPrimary dark:text-white mb-1">
              {profileData.name}
            </h2>
            <p className="text-textSecondary dark:text-gray-400 mb-2">{profileData.employeeId}</p>
            <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
              {profileData.designation}
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
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {stats.map((stat, index) => (
              <Card key={index}>
                <div className="text-center">
                  <div
                    className={`${stat.color} w-12 h-12 mx-auto mb-3 rounded-lg flex items-center justify-center`}
                  >
                    <stat.icon className="text-white" size={24} />
                  </div>
                  <p className="text-2xl font-bold text-textPrimary dark:text-white">{stat.value}</p>
                  <p className="text-sm text-textSecondary dark:text-gray-400">{stat.label}</p>
                </div>
              </Card>
            ))}
          </div>

          <Card>
            <h3 className="text-lg font-semibold mb-4 text-textPrimary dark:text-white">
              Professional Information
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
                  Experience
                </label>
                <p className="font-semibold text-textPrimary dark:text-white">
                  {profileData.experience}
                </p>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-textSecondary dark:text-gray-400 mb-1">
                  Specialization
                </label>
                <p className="font-semibold text-textPrimary dark:text-white">
                  {profileData.specialization}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;

