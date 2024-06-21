import React from 'react';
import UserProgressComponent from '@/components/UserProgress';
import { usersProgress } from '@/lib/data';

// Function to calculate overall progress for all users
const calculateCombinedProgress = () => {
  let totalProgress = 0;
  let userCount = usersProgress.length;

  usersProgress.forEach((user) => {
    let userTotalProgress = 0;
    let submoduleCount = 0;

    Object.keys(user.progress).forEach((module) => {
      Object.keys(user.progress[module]).forEach((submodule) => {
        const totalQuestions = Object.keys(user.progress[module][submodule]).length;
        const answeredQuestions = Object.values(user.progress[module][submodule]).filter((answer) => answer !== null).length;
        userTotalProgress += (answeredQuestions / totalQuestions) * 100;
        submoduleCount++;
      });
    });

    totalProgress += userTotalProgress / submoduleCount;
  });

  return totalProgress / userCount;
};

const IndexPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="w-full max-w-7xl mx-auto px-4 border-b border-gray-300 py-4">
        <h1 className="text-2xl font-semibold">User Progress Demo</h1>
      </header>

      {/* Main content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 mt-8">
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Overall Progress of All Users</h2>
          <div className="bg-gray-200 h-4 rounded-full">
            <div
              className="bg-blue-500 h-4 rounded-full"
              style={{ width: `${calculateCombinedProgress()}%` }}
            ></div>
          </div>
          <p className="text-xs text-right mt-1">{calculateCombinedProgress().toFixed(0)}%</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">User Progress</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {usersProgress.map((user) => (
              <UserProgressComponent key={user.user_id} user={user} />
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-7xl mx-auto px-4 flex items-start py-4 text-gray-500 text-sm">
        <div className="flex-1"></div>
        <div className="flex-1 text-center">
          <p>&copy; The Adpharm</p>
        </div>
        <div className="flex-1"></div>
      </footer>
    </div>
  );
};

export default IndexPage;
