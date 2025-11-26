import { motion } from 'framer-motion';
import { Calendar, FileText, Bus, TrendingUp, Clock, Award } from 'lucide-react';
import Card from '@/components/Card';
import ChartWidget from '@/components/ChartWidget';

const Dashboard = () => {
  const stats = [
    { 
      title: 'Attendance', 
      value: '87%', 
      icon: Calendar, 
      color: 'bg-primary',
      change: '+5%'
    },
    { 
      title: 'Upcoming Classes', 
      value: '4', 
      icon: Clock, 
      color: 'bg-secondary',
      change: 'Today'
    },
    { 
      title: 'New Notes', 
      value: '12', 
      icon: FileText, 
      color: 'bg-accent',
      change: 'This week'
    },
    { 
      title: 'Bus ETA', 
      value: '8 min', 
      icon: Bus, 
      color: 'bg-success',
      change: 'Route 5'
    },
  ];

  const weeklyData = [
    { name: 'Mon', performance: 85 },
    { name: 'Tue', performance: 78 },
    { name: 'Wed', performance: 92 },
    { name: 'Thu', performance: 88 },
    { name: 'Fri', performance: 95 },
    { name: 'Sat', performance: 82 },
  ];

  const recentActivities = [
    { title: 'SE & PM Assignment Submitted', time: '2 hours ago', type: 'success' },
    { title: 'UNIX Class at 10:15 AM', time: 'Upcoming', type: 'info' },
    { title: 'New TOC Notes Available', time: '5 hours ago', type: 'info' },
    { title: 'Bus Arriving Soon', time: '8 minutes', type: 'warning' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-textPrimary dark:text-white">
            Dashboard
          </h1>
          <p className="text-textSecondary dark:text-gray-400 mt-1">
            Welcome back! Here's your overview
          </p>
        </div>
      </div>

      {/* Stats Grid */}
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
                  <p className="text-textSecondary dark:text-gray-400 text-sm">
                    {stat.title}
                  </p>
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

      {/* Achievement Progress */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-textPrimary dark:text-white">
            Achievement Progress
          </h3>
          <Award className="text-accent" size={24} />
        </div>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-textSecondary dark:text-gray-400">Academic Excellence</span>
              <span className="text-primary font-semibold">75%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '75%' }}
                transition={{ duration: 1, delay: 0.5 }}
                className="bg-primary h-2 rounded-full"
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-textSecondary dark:text-gray-400">Attendance Master</span>
              <span className="text-secondary font-semibold">87%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '87%' }}
                transition={{ duration: 1, delay: 0.7 }}
                className="bg-secondary h-2 rounded-full"
              />
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Performance Chart */}
        <div className="lg:col-span-2">
          <ChartWidget
            title="Weekly Performance"
            data={weeklyData}
            type="line"
            dataKey="performance"
          />
        </div>

        {/* Recent Activities */}
        <Card>
          <h3 className="text-lg font-semibold mb-4 text-textPrimary dark:text-white">
            Recent Activities
          </h3>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.type === 'success' ? 'bg-success' :
                  activity.type === 'warning' ? 'bg-accent' : 'bg-primary'
                }`} />
                <div className="flex-1">
                  <p className="text-sm text-textPrimary dark:text-white font-medium">
                    {activity.title}
                  </p>
                  <p className="text-xs text-textSecondary dark:text-gray-400">
                    {activity.time}
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

export default Dashboard;
