import React from 'react';
import { UserProgress } from '@/lib/data';

type UserProgressProps = {
  user: UserProgress;
};

const UserProgressComponent: React.FC<UserProgressProps> = ({ user }) => {
  const calculateSubmoduleProgress = (submodule: { [question: string]: string | null }) => {
    const totalQuestions = Object.keys(submodule).length;
    const answeredQuestions = Object.values(submodule).filter((answer) => answer !== null).length;
    return (answeredQuestions / totalQuestions) * 100;
  };

  const calculateOverallProgress = () => {
    const moduleKeys = Object.keys(user.progress);
    let totalProgress = 0;
    let submoduleCount = 0;

    moduleKeys.forEach((module) => {
      const submoduleKeys = Object.keys(user.progress[module]);
      submoduleKeys.forEach((submodule) => {
        totalProgress += calculateSubmoduleProgress(user.progress[module][submodule]);
        submoduleCount++;
      });
    });

    return totalProgress / submoduleCount;
  };

  return (
    <div className="border rounded-lg p-4 mb-4">
      <h2 className="text-lg font-semibold">{user.name}</h2>
      <p className="text-gray-500 mb-2">{user.course}</p>

      <div className="mb-4">
        <p className="text-sm font-semibold mb-1">Overall Progress</p>
        <div className="bg-gray-200 h-4 rounded-full">
          <div
            className="bg-blue-500 h-4 rounded-full"
            style={{ width: `${calculateOverallProgress()}%` }}
          ></div>
        </div>
        <p className="text-xs text-right mt-1">{calculateOverallProgress().toFixed(0)}%</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.keys(user.progress).map((module) => (
          <div key={module} className="border rounded-lg p-4">
            <h3 className="text-base font-semibold mb-2">{module}</h3>
            {Object.keys(user.progress[module]).map((submodule) => (
              <div key={submodule} className="mb-4">
                <p className="text-sm font-semibold mb-1">{submodule}</p>
                <div className="bg-gray-200 h-2 rounded-full mb-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${calculateSubmoduleProgress(user.progress[module][submodule])}%` }}
                  ></div>
                </div>
                <p className="text-xs text-right mb-2">{calculateSubmoduleProgress(user.progress[module][submodule]).toFixed(0)}%</p>
                <ul className="text-sm list-disc list-inside">
                  {Object.keys(user.progress[module][submodule]).map((question) => (
                    <li key={question} className="mb-1">
                      <p className="font-semibold">{question}</p>
                      <p className="ml-4">{user.progress[module][submodule][question] || "No answer provided"}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProgressComponent;