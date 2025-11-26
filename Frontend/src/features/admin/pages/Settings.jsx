import { Settings as SettingsIcon, Save, Bell, Lock, Database } from 'lucide-react';
import Card from '@/components/Card';
import Button from '@/components/Button';

const Settings = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-textPrimary dark:text-white">System Settings</h1>
          <p className="text-textSecondary dark:text-gray-400 mt-1">
            Configure system preferences and options
          </p>
        </div>
        <Button>
          <Save size={20} />
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-primary/10 p-2 rounded-lg">
              <Bell className="text-primary" size={20} />
            </div>
            <h3 className="text-lg font-semibold text-textPrimary dark:text-white">
              Notification Settings
            </h3>
          </div>
          <div className="space-y-4">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-textPrimary dark:text-white">Email Notifications</span>
              <input type="checkbox" className="rounded" defaultChecked />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-textPrimary dark:text-white">SMS Notifications</span>
              <input type="checkbox" className="rounded" />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-textPrimary dark:text-white">Push Notifications</span>
              <input type="checkbox" className="rounded" defaultChecked />
            </label>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-secondary/10 p-2 rounded-lg">
              <Lock className="text-secondary" size={20} />
            </div>
            <h3 className="text-lg font-semibold text-textPrimary dark:text-white">
              Security Settings
            </h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-textSecondary dark:text-gray-400 mb-2">
                Session Timeout (minutes)
              </label>
              <input
                type="number"
                defaultValue={30}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-textPrimary dark:text-white"
              />
            </div>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-textPrimary dark:text-white">Require 2FA for Admin</span>
              <input type="checkbox" className="rounded" />
            </label>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-accent/10 p-2 rounded-lg">
              <Database className="text-accent" size={20} />
            </div>
            <h3 className="text-lg font-semibold text-textPrimary dark:text-white">
              System Configuration
            </h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-textSecondary dark:text-gray-400 mb-2">
                Backup Frequency
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-textPrimary dark:text-white">
                <option>Daily</option>
                <option>Weekly</option>
                <option>Monthly</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-textSecondary dark:text-gray-400 mb-2">
                Log Retention (days)
              </label>
              <input
                type="number"
                defaultValue={90}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-textPrimary dark:text-white"
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Settings;

