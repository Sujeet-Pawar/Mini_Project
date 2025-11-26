import Card from '@/components/Card';
import Button from '@/components/Button';

const materials = [
  { title: 'Software Engineering - Unit 3', type: 'PDF', updated: '24 Nov 2025' },
  { title: 'ML Lab Manual', type: 'DOCX', updated: '22 Nov 2025' },
  { title: 'Capstone Rubric', type: 'PDF', updated: '18 Nov 2025' }
];

const Materials = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-textPrimary dark:text-white">Teaching Materials</h1>
          <p className="text-textSecondary dark:text-gray-400">Upload and share resources with students.</p>
        </div>
        <Button variant="primary">Upload Material</Button>
      </div>

      <div className="grid gap-4">
        {materials.map((item) => (
          <Card key={item.title} className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-textPrimary dark:text-white">{item.title}</h3>
              <p className="text-sm text-textSecondary dark:text-gray-400">
                {item.type} · Updated {item.updated}
              </p>
            </div>
            <Button variant="outline" size="sm">
              Share
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Materials;

