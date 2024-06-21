# User Progress Demo

This project is a user progress tracking application that visualizes progress for individual users and overall progress across all users. It provides insights into user learning modules, their progress, and answers provided.

## Features Implemented

- **User Progress Display:** Visual representation of progress for each user across different learning modules.
- **Overall Progress:** Calculation and display of overall progress for all users combined.
- **Responsive Design:** Utilized Tailwind CSS for creating a responsive grid layout to ensure usability on various devices.
- **Readability Enhancement:** Implemented features to improve the readability of questions and answers.

## Challenges and Solutions

### Challenge 1: Dynamic Progress Calculation

**Issue:** Calculating the progress dynamically for each submodule, user, and overall was challenging due to the nested data structure.

**Solution:** Created helper functions to iterate through the nested data structure and calculate the progress percentage accurately.

### Challenge 2: Responsive Design

**Issue:** Ensuring the layout was responsive and readable on all screen sizes required careful planning and testing.

**Solution:** Utilized Tailwind CSS to create a responsive grid layout that adapts to different screen sizes, ensuring a two-column layout on medium and larger screens.

### Challenge 3: Readability of Data

**Issue:** Displaying the questions and answers in a readable format while maintaining a clean layout was difficult.

**Solution:** Enhanced the `UserProgressComponent` to display questions and answers clearly, using lists and indentation for better readability.

### Future Enhancements

- **Data Fetching:** Implement data fetching from an API to dynamically load user progress data.
- **User Interactivity:** Add features for users to update their progress and answers directly through the UI.
- **Detailed Analytics:** Provide more detailed analytics and visualizations for user progress, such as charts and graphs.
- **Authentication:** Implement user authentication to secure access to user progress data.

## How to Use

### Setting Up the Project

1. Clone the repository: `git clone https://github.com/your/repository.git`
2. Install dependencies: `npm install`

### Running the Application

1. Start the development server: `npm run dev`
2. Open your browser and go to `http://localhost:3000` to view the application.

## Tech Stack

- React
- Tailwind CSS

## Contributors

- [Your Name](https://github.com/your-profile)
- [Contributor Name](https://github.com/contributor-profile)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
