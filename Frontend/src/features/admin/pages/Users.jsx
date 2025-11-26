import { useState } from 'react';
import { Users, Plus, Search, Filter, Edit, Trash2 } from 'lucide-react';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Table from '@/components/Table';

const Users = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const users = [
    {
      id: 1,
      name: 'Omkar Patil',
      email: 'omkar.patil@college.edu',
      role: 'Student',
      department: 'CSE',
      year: 3,
      status: 'active'
    },
    {
      id: 2,
      name: 'Prof. Shashikala R.D.',
      email: 'shashikala.rd@college.edu',
      role: 'Faculty',
      department: 'CSE',
      status: 'active'
    },
    {
      id: 3,
      name: 'Admin User',
      email: 'admin@college.edu',
      role: 'Admin',
      status: 'active'
    }
  ];

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const tableHeaders = ['Name', 'Email', 'Role', 'Department', 'Year', 'Status', 'Actions'];
  const tableData = filteredUsers.map((user) => [
    user.name,
    user.email,
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${
        user.role === 'Admin'
          ? 'bg-error/10 text-error'
          : user.role === 'Faculty'
          ? 'bg-secondary/10 text-secondary'
          : 'bg-primary/10 text-primary'
      }`}
    >
      {user.role}
    </span>,
    user.department || '-',
    user.year || '-',
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${
        user.status === 'active'
          ? 'bg-success/10 text-success'
          : 'bg-gray-400/10 text-gray-400'
      }`}
    >
      {user.status}
    </span>,
    <div className="flex gap-2">
      <Button size="sm" variant="outline">
        <Edit size={16} />
      </Button>
      <Button size="sm" variant="danger">
        <Trash2 size={16} />
      </Button>
    </div>
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-textPrimary dark:text-white">User Management</h1>
          <p className="text-textSecondary dark:text-gray-400 mt-1">
            Manage students, faculty, and admin users
          </p>
        </div>
        <Button>
          <Plus size={20} />
          Add User
        </Button>
      </div>

      <Card>
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-textPrimary dark:text-white"
            />
          </div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-textPrimary dark:text-white"
          >
            <option value="all">All Roles</option>
            <option value="Student">Student</option>
            <option value="Faculty">Faculty</option>
            <option value="Admin">Admin</option>
          </select>
          <Button variant="outline">
            <Filter size={20} />
            Filter
          </Button>
        </div>

        <Table headers={tableHeaders} data={tableData} />
      </Card>
    </div>
  );
};

export default Users;

