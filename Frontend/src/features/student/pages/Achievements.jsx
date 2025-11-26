import { Trophy, Award, Star, Target, Medal, TrendingUp } from 'lucide-react';
import Card from '../components/Card';
import { motion } from 'framer-motion';

const Achievements = () => {
  const badges = [
    {
      id: 1,
      name: 'Perfect Attendance',
      description: 'Attended all classes for 3 months',
      icon: Award,
      color: 'bg-success',
      earned: true,
      date: '2024-01-15'
    },
    {
      id: 2,
      name: 'Academic Excellence',
      description: 'Maintained 90+ average for semester',
      icon: Trophy,
      color: 'bg-primary',
      earned: true,
      date: '2024-01-10'
    },
    {
      id: 3,
      name: 'Top Performer',
      description: 'Ranked in top 10% of class',
      icon: Star,
      color: 'bg-accent',
      earned: true,
      date: '2024-01-05'
    },
    {
      id: 4,
      name: 'Assignment Master',
      description: 'Submitted all assignments on time',
      icon: Target,
      color: 'bg-secondary',
      earned: true,
      date: '2023-12-20'
    },
    {
      id: 5,
      name: 'Quick Learner',
      description: 'Improved grade by 10% in one month',
      icon: TrendingUp,
      color: 'bg-purple-500',
      earned: false,
      progress: 75
    },
    {
      id: 6,
      name: 'Gold Medalist',
      description: 'Score 95+ in all subjects',
      icon: Medal,
      color: 'bg-yellow-500',
      earned: false,
      progress: 60
    },
  ];

  const leaderboard = [
    { rank: 1, name: 'Priya Sharma', points: 2850, avatar: 'PS' },
    { rank: 2, name: 'Arjun Mehta', points: 2720, avatar: 'AM' },
    { rank: 3, name: 'Ananya Desai', points: 2680, avatar: 'AD' },
    { rank: 4, name: 'Rohan Gupta', points: 2540, avatar: 'RG' },
    { rank: 5, name: 'Omkar Patil', points: 2480, avatar: 'OP', isCurrentUser: true },
    { rank: 6, name: 'Sneha Reddy', points: 2420, avatar: 'SR' },
    { rank: 7, name: 'Vikram Singh', points: 2380, avatar: 'VS' },
  ];

  const timeline = [
    { date: '2024-01-15', title: 'Perfect Attendance Badge', type: 'badge' },
    { date: '2024-01-10', title: 'Academic Excellence Badge', type: 'badge' },
    { date: '2024-01-08', title: 'Reached 2500 points', type: 'milestone' },
    { date: '2024-01-05', title: 'Top Performer Badge', type: 'badge' },
    { date: '2023-12-20', title: 'Assignment Master Badge', type: 'badge' },
  ];

  const stats = [
    { label: 'Total Points', value: '2,480', icon: Trophy, color: 'bg-primary' },
    { label: 'Badges Earned', value: '4', icon: Award, color: 'bg-success' },
    { label: 'Class Rank', value: '#5', icon: Star, color: 'bg-accent' },
    { label: 'Streak Days', value: '45', icon: Target, color: 'bg-secondary' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-textPrimary dark:text-white">
          Achievements
        </h1>
        <p className="text-textSecondary dark:text-gray-400 mt-1">
          Track your progress and compete with peers
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <div className="flex items-center gap-4">
                <div className={`${stat.color} p-4 rounded-lg`}>
                  <stat.icon className="text-white" size={24} />
                </div>
                <div>
                  <p className="text-sm text-textSecondary dark:text-gray-400">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-textPrimary dark:text-white">
                    {stat.value}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Badges */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <h3 className="text-lg font-semibold mb-4 text-textPrimary dark:text-white">
              Your Badges
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {badges.map((badge) => (
                <motion.div
                  key={badge.id}
                  whileHover={{ scale: 1.02 }}
                  className={`p-4 rounded-lg border-2 ${
                    badge.earned
                      ? 'border-transparent bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700'
                      : 'border-dashed border-gray-300 dark:border-gray-600 opacity-60'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`${badge.color} p-3 rounded-lg ${!badge.earned && 'opacity-50'}`}>
                      <badge.icon className="text-white" size={24} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-textPrimary dark:text-white mb-1">
                        {badge.name}
                      </h4>
                      <p className="text-sm text-textSecondary dark:text-gray-400 mb-2">
                        {badge.description}
                      </p>
                      {badge.earned ? (
                        <p className="text-xs text-success">
                          Earned on {badge.date}
                        </p>
                      ) : (
                        <div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-1">
                            <div
                              className="bg-primary h-2 rounded-full"
                              style={{ width: `${badge.progress}%` }}
                            />
                          </div>
                          <p className="text-xs text-textSecondary dark:text-gray-400">
                            {badge.progress}% complete
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>

          {/* Timeline */}
          <Card>
            <h3 className="text-lg font-semibold mb-4 text-textPrimary dark:text-white">
              Achievement Timeline
            </h3>
            <div className="space-y-4">
              {timeline.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-3 h-3 rounded-full ${
                      item.type === 'badge' ? 'bg-primary' : 'bg-secondary'
                    }`} />
                    {index < timeline.length - 1 && (
                      <div className="w-0.5 h-full bg-gray-300 dark:bg-gray-600 mt-2" />
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <p className="font-semibold text-textPrimary dark:text-white">
                      {item.title}
                    </p>
                    <p className="text-sm text-textSecondary dark:text-gray-400">
                      {item.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Leaderboard */}
        <Card>
          <h3 className="text-lg font-semibold mb-4 text-textPrimary dark:text-white">
            Leaderboard
          </h3>
          <div className="space-y-3">
            {leaderboard.map((student) => (
              <div
                key={student.rank}
                className={`flex items-center gap-3 p-3 rounded-lg ${
                  student.isCurrentUser
                    ? 'bg-primary/10 border-2 border-primary'
                    : 'bg-gray-50 dark:bg-gray-700'
                }`}
              >
                <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold ${
                  student.rank === 1 ? 'bg-yellow-400 text-yellow-900' :
                  student.rank === 2 ? 'bg-gray-300 text-gray-700' :
                  student.rank === 3 ? 'bg-orange-400 text-orange-900' :
                  'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                }`}>
                  {student.rank}
                </div>
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-semibold">
                  {student.avatar}
                </div>
                <div className="flex-1">
                  <p className={`font-semibold ${
                    student.isCurrentUser ? 'text-primary' : 'text-textPrimary dark:text-white'
                  }`}>
                    {student.name}
                  </p>
                  <p className="text-sm text-textSecondary dark:text-gray-400">
                    {student.points} points
                  </p>
                </div>
                {student.rank <= 3 && (
                  <Trophy
                    className={
                      student.rank === 1 ? 'text-yellow-500' :
                      student.rank === 2 ? 'text-gray-400' :
                      'text-orange-500'
                    }
                    size={20}
                  />
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Achievements;
