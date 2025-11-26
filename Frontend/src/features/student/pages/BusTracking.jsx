import { useState, useEffect } from 'react';
import { Bus, MapPin, Clock, User, Phone } from 'lucide-react';
import Card from '../components/Card';
import { useToast } from '../hooks/useToast';
import ToastNotification from '../components/ToastNotification';

const BusTracking = () => {
  const [busPosition, setBusPosition] = useState({ x: 20, y: 30 });
  const { toasts, showToast, removeToast } = useToast();

  const buses = [
    {
      id: 1,
      number: 'Route 5',
      driver: 'John Smith',
      phone: '+1 234-567-8900',
      eta: '8 min',
      stops: 3,
      capacity: '45/50',
      status: 'On Time'
    },
    {
      id: 2,
      number: 'Route 12',
      driver: 'Sarah Johnson',
      phone: '+1 234-567-8901',
      eta: '15 min',
      stops: 5,
      capacity: '38/50',
      status: 'On Time'
    },
    {
      id: 3,
      number: 'Route 8',
      driver: 'Mike Wilson',
      phone: '+1 234-567-8902',
      eta: '22 min',
      stops: 7,
      capacity: '42/50',
      status: 'Delayed'
    },
  ];

  const [selectedBus, setSelectedBus] = useState(buses[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBusPosition(prev => ({
        x: (prev.x + Math.random() * 4 - 2) % 100,
        y: (prev.y + Math.random() * 4 - 2) % 100
      }));
    }, 2000);

    const notificationTimer = setTimeout(() => {
      showToast('Bus is near your stop!', 'warning');
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(notificationTimer);
    };
  }, []);

  return (
    <div className="space-y-6">
      <ToastNotification toasts={toasts} removeToast={removeToast} />
      
      <div>
        <h1 className="text-3xl font-bold text-textPrimary dark:text-white">
          Bus Tracking
        </h1>
        <p className="text-textSecondary dark:text-gray-400 mt-1">
          Real-time bus location and ETA
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Section */}
        <div className="lg:col-span-2">
          <Card>
            <h3 className="text-lg font-semibold mb-4 text-textPrimary dark:text-white">
              Live Map
            </h3>
            <div className="bg-gradient-to-br from-blue-100 to-green-100 dark:from-gray-700 dark:to-gray-600 rounded-lg aspect-video relative overflow-hidden">
              {/* Simulated Map Background */}
              <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-green-200 dark:bg-green-900 rounded-full opacity-30" />
                <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-blue-200 dark:bg-blue-900 rounded-full opacity-30" />
              </div>

              {/* Bus Marker */}
              <div
                className="absolute transition-all duration-2000 ease-in-out"
                style={{
                  left: `${busPosition.x}%`,
                  top: `${busPosition.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-75" />
                  <div className="relative bg-primary p-3 rounded-full shadow-lg">
                    <Bus className="text-white" size={24} />
                  </div>
                </div>
              </div>

              {/* Stop Markers */}
              {[
                { x: 30, y: 40 },
                { x: 50, y: 60 },
                { x: 70, y: 50 }
              ].map((stop, index) => (
                <div
                  key={index}
                  className="absolute"
                  style={{
                    left: `${stop.x}%`,
                    top: `${stop.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <div className="bg-secondary p-2 rounded-full shadow-md">
                    <MapPin className="text-white" size={16} />
                  </div>
                </div>
              ))}

              {/* Your Location */}
              <div
                className="absolute"
                style={{
                  left: '60%',
                  top: '70%',
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-accent rounded-full animate-pulse" />
                  <div className="relative bg-accent p-2 rounded-full shadow-lg">
                    <MapPin className="text-white" size={20} />
                  </div>
                </div>
              </div>
            </div>

            {/* Map Legend */}
            <div className="flex items-center gap-6 mt-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-primary rounded-full" />
                <span className="text-textSecondary dark:text-gray-400">Bus</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-secondary rounded-full" />
                <span className="text-textSecondary dark:text-gray-400">Stops</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-accent rounded-full" />
                <span className="text-textSecondary dark:text-gray-400">Your Location</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Bus Info Sidebar */}
        <div className="space-y-6">
          <Card>
            <h3 className="text-lg font-semibold mb-4 text-textPrimary dark:text-white">
              Selected Bus
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-primary p-3 rounded-lg">
                  <Bus className="text-white" size={24} />
                </div>
                <div>
                  <p className="font-semibold text-textPrimary dark:text-white">
                    {selectedBus.number}
                  </p>
                  <p className="text-sm text-textSecondary dark:text-gray-400">
                    {selectedBus.status}
                  </p>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <Clock className="text-textSecondary dark:text-gray-400" size={18} />
                  <div>
                    <p className="text-sm text-textSecondary dark:text-gray-400">ETA</p>
                    <p className="font-semibold text-primary">{selectedBus.eta}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="text-textSecondary dark:text-gray-400" size={18} />
                  <div>
                    <p className="text-sm text-textSecondary dark:text-gray-400">Stops Away</p>
                    <p className="font-semibold text-textPrimary dark:text-white">
                      {selectedBus.stops}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <User className="text-textSecondary dark:text-gray-400" size={18} />
                  <div>
                    <p className="text-sm text-textSecondary dark:text-gray-400">Driver</p>
                    <p className="font-semibold text-textPrimary dark:text-white">
                      {selectedBus.driver}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="text-textSecondary dark:text-gray-400" size={18} />
                  <div>
                    <p className="text-sm text-textSecondary dark:text-gray-400">Contact</p>
                    <p className="font-semibold text-textPrimary dark:text-white">
                      {selectedBus.phone}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-textSecondary dark:text-gray-400 mb-2">
                  Capacity
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-secondary h-2 rounded-full" 
                      style={{ width: '90%' }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-textPrimary dark:text-white">
                    {selectedBus.capacity}
                  </span>
                </div>
              </div>
            </div>
          </Card>

          {/* Other Buses */}
          <Card>
            <h3 className="text-lg font-semibold mb-4 text-textPrimary dark:text-white">
              Other Routes
            </h3>
            <div className="space-y-3">
              {buses.filter(b => b.id !== selectedBus.id).map(bus => (
                <div
                  key={bus.id}
                  onClick={() => setSelectedBus(bus)}
                  className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary cursor-pointer transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-textPrimary dark:text-white">
                        {bus.number}
                      </p>
                      <p className="text-sm text-textSecondary dark:text-gray-400">
                        ETA: {bus.eta}
                      </p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      bus.status === 'On Time' 
                        ? 'bg-success/10 text-success' 
                        : 'bg-accent/10 text-accent'
                    }`}>
                      {bus.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BusTracking;
