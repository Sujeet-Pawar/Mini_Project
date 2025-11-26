import { FileText, Download, TrendingUp, Users, Calendar } from 'lucide-react';
import Card from '@/components/Card';
import Button from '@/components/Button';
import ChartWidget from '@/components/ChartWidget';

const Reports = () => {
  const reports = [
    { id: 1, name: 'Attendance Report', type: 'Monthly', date: '2024-12-01' },
    { id: 2, name: 'Student Performance', type: 'Semester', date: '2024-11-15' },
    { id: 3, name: 'Faculty Activity', type: 'Weekly', date: '2024-12-10' }
  ];

  const attendanceData = [
    { name: 'Jan', attendance: 85 },
    { name: 'Feb', attendance: 88 },
    { name: 'Mar', attendance: 92 },
    { name: 'Apr', attendance: 87 },
    { name: 'May', attendance: 90 },
    { name: 'Jun', attendance: 93 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-textPrimary dark:text-white">Reports</h1>
          <p className="text-textSecondary dark:text-gray-400 mt-1">
            View and generate system reports
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartWidget
          title="Attendance Trend (6 Months)"
          data={attendanceData}
          type="bar"
          dataKey="attendance"
        />

        <Card>
          <h3 className="text-lg font-semibold mb-4 text-textPrimary dark:text-white">
            Recent Reports
          </h3>
          <div className="space-y-4">
            {reports.map((report) => (
              <div
                key={report.id}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <FileText className="text-primary" size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-textPrimary dark:text-white">{report.name}</p>
                    <p className="text-sm text-textSecondary dark:text-gray-400">
                      {report.type} • {new Date(report.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  <Download size={16} />
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Reports;

