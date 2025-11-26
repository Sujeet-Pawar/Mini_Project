import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Card from './Card';

const ChartWidget = ({ title, data, type = 'line', dataKey, xKey = 'name' }) => {
  const ChartComponent = type === 'line' ? LineChart : BarChart;
  const DataComponent = type === 'line' ? Line : Bar;

  return (
    <Card>
      <h3 className="text-lg font-semibold mb-4 text-textPrimary dark:text-white">
        {title}
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <ChartComponent data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis dataKey={xKey} stroke="#6C757D" />
          <YAxis stroke="#6C757D" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#fff', 
              border: '1px solid #e0e0e0',
              borderRadius: '8px'
            }} 
          />
          <Legend />
          <DataComponent 
            type="monotone" 
            dataKey={dataKey} 
            stroke="#2E86DE" 
            fill="#2E86DE"
            strokeWidth={2}
          />
        </ChartComponent>
      </ResponsiveContainer>
    </Card>
  );
};

export default ChartWidget;
