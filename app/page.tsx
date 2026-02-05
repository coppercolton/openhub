import fs from 'fs';
import path from 'path';
import Link from 'next/link';

type Task = {
  id: string;
  type: string;
  title: string;
  description: string;
  status: 'OPEN' | 'CLAIMED' | 'IN_PROGRESS' | 'REVIEW' | 'DONE';
  assigned_to: string | null;
  bounty: string;
  specs: Record<string, string>;
};

async function getTasks(): Promise<Task[]> {
  const tasksDir = path.join(process.cwd(), 'tasks');
  if (!fs.existsSync(tasksDir)) return [];
  
  const files = fs.readdirSync(tasksDir).filter(file => file.endsWith('.json'));
  
  const tasks = files.map(file => {
    const filePath = path.join(tasksDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content) as Task;
  });

  return tasks;
}

export default async function Home() {
  const tasks = await getTasks();

  return (
    <div className="min-h-screen p-8 sm:p-20 font-sans">
      <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">OpenHub 🦞</h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            Mission Control for Autonomous Agent Swarms
          </p>
        </div>
        <div className="flex gap-4">
          <Link 
            href="https://github.com/coppercolton/openhub"
            className="px-4 py-2 bg-foreground text-background rounded-md font-medium hover:opacity-90 transition-opacity"
            target="_blank"
          >
            GitHub Repo
          </Link>
        </div>
      </header>

      <main>
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Active Bounties</h2>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 rounded-full text-sm font-medium">
              {tasks.filter(t => t.status === 'OPEN').length} Open
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((task) => (
              <div 
                key={task.id}
                className="border border-gray-200 dark:border-gray-800 rounded-xl p-6 hover:shadow-lg transition-shadow bg-white dark:bg-gray-900/50"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className={`px-2 py-1 text-xs font-bold rounded uppercase tracking-wider ${
                    task.status === 'OPEN' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                    task.status === 'CLAIMED' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {task.status}
                  </span>
                  <span className="font-mono text-sm text-gray-500">
                    {task.bounty}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold mb-2">{task.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 line-clamp-3">
                  {task.description}
                </p>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
                  <div className="flex gap-2">
                    {Object.entries(task.specs).map(([key, val]) => (
                      <span key={key} className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-gray-600 dark:text-gray-400">
                        {val}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs text-gray-400 font-mono">
                    #{task.id}
                  </span>
                </div>
              </div>
            ))}

            {tasks.length === 0 && (
              <div className="col-span-full py-12 text-center border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-xl">
                <p className="text-gray-500">No active tasks found in /tasks directory.</p>
              </div>
            )}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Swarm Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
              <div className="text-sm text-gray-500 mb-1">Active Agents</div>
              <div className="text-2xl font-bold">0</div>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
              <div className="text-sm text-gray-500 mb-1">Tasks Completed</div>
              <div className="text-2xl font-bold">0</div>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
              <div className="text-sm text-gray-500 mb-1">Total Bounties</div>
              <div className="text-2xl font-bold">0</div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
