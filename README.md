# User Progress Demo

## Overview

This project demonstrates a visual representation of user progress in a course. It showcases the progress of multiple users across different modules and submodules, providing a clear and readable display of questions and their respective answers. The project also calculates and displays overall progress for each user and for all users combined.

## Approach

### 1. Predefined Data Types
- Used predefined data types for `Answer`, `SubmoduleQuestions`, `ModuleProgress`, and `UserProgress` to ensure consistency and type safety.
- Created a mock dataset `usersProgress` containing sample data for multiple users.

### 2. Component Structure
- Developed a `UserProgressComponent` to display individual user progress.
- Designed the `IndexPage` to display the overall progress of all users and individual user progress components.

### 3. Progress Calculation
- Implemented functions to calculate the progress percentage of each submodule, each user, and the combined progress of all users.

### 4. Responsive Layout
- Utilized Tailwind CSS for styling and ensuring a responsive layout.
- Configured the grid layout to display two columns on medium and larger screens.

### 5. Readable Display
- Enhanced the `UserProgressComponent` to display questions and answers in a clear and readable manner.
- Ensured unanswered questions are indicated appropriately.

## Implementation Details

### User Progress Component
```typescript
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
```
### Index Page
```typescript
import React from 'react';
import UserProgressComponent from '@/components/UserProgress';
import { usersProgress } from '@/lib/data';

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
      <header className="w-full max-w-7xl mx-auto px-4 border-b border-gray-300 py-4">
        <h1 className="text-2xl font-semibold">User Progress Demo</h1>
      </header>

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
```

## Challenges and Solutions
### Challenge 1: Dynamic Progress Calculation
#### Issue
Calculating the progress dynamically for each submodule, user, and overall was challenging due to the nested data structure.

#### Solution
Created helper functions to iterate through the nested data structure and calculate the progress percentage accurately.

### Challenge 2: Responsive Design
#### Issue
Ensuring the layout was responsive and readable on all screen sizes required careful planning and testing.

#### Solution
Utilized Tailwind CSS to create a responsive grid layout that adapts to different screen sizes, ensuring a two-column layout on medium and larger screens.

### Challenge 3: Readability of Data
#### Issue
Displaying the questions and answers in a readable format while maintaining a clean layout was difficult.

#### Solution
Enhanced the UserProgressComponent to display questions and answers clearly, using lists and indentation for better readability.

## Future Enhancements

- **Data Fetching:** Implement data fetching from an API to dynamically load user progress data.
- **User Interactivity:** Add features for users to update their progress and answers directly through the UI.
- **Detailed Analytics:** Provide more detailed analytics and visualizations for user progress, such as charts and graphs.
- **Authentication:** Implement user authentication to secure access to user progress data.



