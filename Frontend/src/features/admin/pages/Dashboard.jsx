import { motion } from 'framer-motion';
import { Users, BookOpen, Calendar, TrendingUp, Award, FileText } from 'lucide-react';
import Card from '@/components/Card';
import ChartWidget from '@/components/ChartWidget';

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Students',
      value: '1,245',
      icon: Users,
      color: 'bg-primary',
      change: '+12%'
    },
    {
      title: 'Faculty Members',
      value: '85',
      icon: Users,
      color: 'bg-secondary',
      change: '+3%'
    },
    {
      title: 'Active Courses',
      value: '42',
      icon: BookOpen,
      color: 'bg-accent',
      change: 'Stable'
    },
    {
      title: 'Attendance Rate',
      value: '87%',
      icon: Calendar,
      color: 'bg-success',
      change: '+2%'
    }
  ];

  const weeklyData = [
    { name: 'Mon', attendance: 85 },
    { name: 'Tue', attendance: 88 },
    { name: 'Wed', attendance: 92 },
    { name: 'Thu', attendance: 87 },
    { name: 'Fri', attendance: 90 },
    { name: 'Sat', attendance: 82 }
  ];

  const recentActivities = [
    { title: 'New student registered', time: '2 hours ago', type: 'info' },
    { title: 'Assignment submission deadline', time: '5 hours ago', type: 'warning' },
    { title: 'Faculty meeting scheduled', time: '1 day ago', type: 'info' },
    { title: 'System backup completed', time: '2 days ago', type: 'success' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-textPrimary dark:text-white">Admin Dashboard</h1>
          <p className="text-textSecondary dark:text-gray-400 mt-1">
            Overview of college management system
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card hover={true}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-textSecondary dark:text-gray-400 text-sm">{stat.title}</p>
                  <h3 className="text-3xl font-bold text-textPrimary dark:text-white mt-2">
                    {stat.value}
                  </h3>
                  <p className="text-xs text-textSecondary dark:text-gray-400 mt-1">
                    {stat.change}
                  </p>
                </div>
                <div className={`${stat.color} p-4 rounded-lg`}>
                  <stat.icon className="text-white" size={24} />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ChartWidget
            title="Weekly Attendance Trend"
            data={weeklyData}
            type="line"
            dataKey="attendance"
          />
        </div>

        <Card>
          <h3 className="text-lg font-semibold mb-4 text-textPrimary dark:text-white">
            Recent Activities
          </h3>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start gap-3">
                <div
                  className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'success'
                      ? 'bg-success'
                      : activity.type === 'warning'
                      ? 'bg-accent'
                      : 'bg-primary'
                  }`}
                />
                <div className="flex-1">
                  <p className="text-sm text-textPrimary dark:text-white font-medium">
                    {activity.title}
                  </p>
                  <p className="text-xs text-textSecondary dark:text-gray-400">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

