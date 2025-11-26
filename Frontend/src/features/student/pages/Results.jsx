import { TrendingUp, TrendingDown, Award, Target } from 'lucide-react';
import Card from '../components/Card';
import ChartWidget from '../components/ChartWidget';
import Table from '../components/Table';

const Results = () => {
  const performanceData = [
    { name: 'Jan', score: 78 },
    { name: 'Feb', score: 82 },
    { name: 'Mar', score: 85 },
    { name: 'Apr', score: 88 },
    { name: 'May', score: 92 },
    { name: 'Jun', score: 90 },
  ];

  const subjectData = [
    { name: 'SE & PM', score: 92 },
    { name: 'UNIX', score: 88 },
    { name: 'TOC', score: 85 },
    { name: 'CN', score: 95 },
    { name: 'RM & IPR', score: 87 },
    { name: 'Data Viz', score: 90 },
  ];

  const cieResults = [
    {
      subject: 'SE & PM',
      code: 'BCS501',
      cie1: '42/50',
      cie2: '46/50',
      total: '88/100'
    },
    {
      subject: 'UNIX',
      code: 'BCS515C',
      cie1: '47/50',
      cie2: '48/50',
      total: '95/100'
    },
    {
      subject: 'TOC',
      code: 'BCS503',
      cie1: '44/50',
      cie2: '48/50',
      total: '92/100'
    },
    {
      subject: 'CN',
      code: 'BCS502',
      cie1: '45/50',
      cie2: '48/50',
      total: '93/100'
    },
    {
      subject: 'RM & IPR',
      code: 'BRMK557',
      cie1: '43/50',
      cie2: '44/50',
      total: '87/100'
    },
    {
      subject: 'Data Visualization',
      code: 'BAIL504',
      cie1: '45/50',
      cie2: '45/50',
      total: '90/100'
    },
    {
      subject: 'EVS',
      code: 'BCS508',
      cie1: '40/50',
      cie2: '42/50',
      total: '82/100'
    },
  ];

  const stats = [
    {
      title: 'Overall Average',
      value: '89.4%',
      change: '+3.2%',
      trend: 'up',
      icon: Target,
      color: 'bg-primary'
    },
    {
      title: 'Class Rank',
      value: '#12',
      change: '+2 positions',
      trend: 'up',
      icon: Award,
      color: 'bg-secondary'
    },
    {
      title: 'Highest Score',
      value: '95%',
      change: 'Computer Networks',
      trend: 'up',
      icon: TrendingUp,
      color: 'bg-success'
    },
    {
      title: 'Improvement',
      value: '+5.2%',
      change: 'From last semester',
      trend: 'up',
      icon: TrendingUp,
      color: 'bg-accent'
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-textPrimary dark:text-white">
          Results & Performance
        </h1>
        <p className="text-textSecondary dark:text-gray-400 mt-1">
          Track your academic progress and achievements
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-textSecondary dark:text-gray-400 text-sm">
                  {stat.title}
                </p>
                <h3 className="text-3xl font-bold text-textPrimary dark:text-white mt-2">
                  {stat.value}
                </h3>
                <div className="flex items-center gap-1 mt-2">
                  {stat.trend === 'up' ? (
                    <TrendingUp className="text-success" size={16} />
                  ) : (
                    <TrendingDown className="text-error" size={16} />
                  )}
                  <p className={`text-xs ${stat.trend === 'up' ? 'text-success' : 'text-error'}`}>
                    {stat.change}
                  </p>
                </div>
              </div>
              <div className={`${stat.color} p-4 rounded-lg`}>
                <stat.icon className="text-white" size={24} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartWidget
          title="Performance Trend (Last 6 Months)"
          data={performanceData}
          type="line"
          dataKey="score"
        />
        <ChartWidget
          title="Subject-wise Performance"
          data={subjectData}
          type="bar"
          dataKey="score"
        />
      </div>

      {/* Grade Distribution */}
      <Card>
        <h3 className="text-lg font-semibold mb-4 text-textPrimary dark:text-white">
          Grade Distribution
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { grade: 'A', count: 8, color: 'bg-success' },
            { grade: 'B+', count: 12, color: 'bg-primary' },
            { grade: 'B', count: 6, color: 'bg-secondary' },
            { grade: 'C+', count: 3, color: 'bg-accent' },
            { grade: 'C', count: 1, color: 'bg-error' },
          ].map((item) => (
            <div key={item.grade} className="text-center">
              <div className={`${item.color} text-white rounded-lg p-4 mb-2`}>
                <p className="text-2xl font-bold">{item.count}</p>
              </div>
              <p className="text-textSecondary dark:text-gray-400 font-medium">
                Grade {item.grade}
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* CIE Results */}
      <Card>
        <h3 className="text-lg font-semibold mb-4 text-textPrimary dark:text-white">
          📊 Academic Record - CIE Marks
        </h3>
        <div className="space-y-4">
          {cieResults.map((result, index) => (
            <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="text-lg font-semibold text-textPrimary dark:text-white">
                    {result.subject}
                  </h4>
                  <p className="text-sm text-textSecondary dark:text-gray-400">
                    {result.code}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">
                    {result.total}
                  </p>
                  <p className="text-xs text-textSecondary dark:text-gray-400">Total</p>
                </div>
              </div>
              <div className="flex gap-4 text-sm">
                <div className="flex-1 bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <p className="text-textSecondary dark:text-gray-400 mb-1">CIE 1</p>
                  <p className="text-lg font-semibold text-textPrimary dark:text-white">
                    {result.cie1}
                  </p>
                </div>
                <div className="flex-1 bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <p className="text-textSecondary dark:text-gray-400 mb-1">CIE 2</p>
                  <p className="text-lg font-semibold text-textPrimary dark:text-white">
                    {result.cie2}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Performance Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-success/10 p-2 rounded-lg">
              <TrendingUp className="text-success" size={20} />
            </div>
            <h4 className="font-semibold text-textPrimary dark:text-white">
              Strengths
            </h4>
          </div>
          <ul className="space-y-2 text-sm text-textSecondary dark:text-gray-400">
            <li>• CN (95%)</li>
            <li>• SE & PM (92%)</li>
            <li>• Data Visualization (90%)</li>
          </ul>
        </Card>

        <Card>
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-accent/10 p-2 rounded-lg">
              <Target className="text-accent" size={20} />
            </div>
            <h4 className="font-semibold text-textPrimary dark:text-white">
              Areas to Improve
            </h4>
          </div>
          <ul className="space-y-2 text-sm text-textSecondary dark:text-gray-400">
            <li>• TOC (85%)</li>
            <li>• RM & IPR (87%)</li>
          </ul>
        </Card>

        <Card>
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-primary/10 p-2 rounded-lg">
              <Award className="text-primary" size={20} />
            </div>
            <h4 className="font-semibold text-textPrimary dark:text-white">
              Achievements
            </h4>
          </div>
          <ul className="space-y-2 text-sm text-textSecondary dark:text-gray-400">
            <li>• Top 10% in class</li>
            <li>• Perfect attendance</li>
            <li>• 5% improvement</li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default Results;
