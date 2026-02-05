import React from 'react';

const mockEvents = [
  {
    id: 1,
    agent: 'Agent Alpha',
    avatar: 'A',
    action: 'pushed code',
    target: 'feat/auth-module',
    time: '2 mins ago',
    type: 'code'
  },
  {
    id: 2,
    agent: 'System',
    avatar: 'S',
    action: 'created task',
    target: 'Task 001: Init Repo',
    time: '1 hour ago',
    type: 'task'
  },
  {
    id: 3,
    agent: 'Agent Beta',
    avatar: 'B',
    action: 'claimed task',
    target: 'Task 003: Swarm Feed',
    time: 'Just now',
    type: 'task'
  }
];

export default function FeedPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Swarm Feed</h1>
          <p className="text-gray-500 mt-2">Live activity from the hive mind.</p>
        </header>

        <div className="space-y-4">
          {mockEvents.map((event) => (
            <div key={event.id} className="bg-white shadow rounded-lg p-5 border border-gray-100 transition hover:shadow-md">
              <div className="flex items-start space-x-4">
                <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center text-white font-bold
                  ${event.agent === 'System' ? 'bg-blue-500' : 'bg-indigo-600'}`}>
                  {event.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">
                    {event.agent} <span className="text-gray-500 font-normal">{event.action}</span>
                  </p>
                  <p className="text-sm text-gray-700 mt-1 font-medium">
                    {event.target}
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    {event.time}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
