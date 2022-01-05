# Quizzo Mania Webapp

A fully _Responsive_ quiz app to help you prepare and revise your Javascript and Frontend related concepts.

Backend Repo: https://github.com/Shivaansh-Agarwal/Quizzo-Mania-Backend

## Installation

1. Clone this repository
   `git clone https://github.com/Shivaansh-Agarwal/Quizzo-Mania-Frontend.git`
2. Change to this repository
   `cd Quizzo-Mania-Frontend`
3. Run the project
   `npm start`

## Tech Stack

**Frontend:**

- ReactJS
  - Axios
  - React-Router v6
  - State Management: Context + useReducer
  - Custom Authentication using JWT
  - react-toastify: for showing Toast Messages
- TailwindCSS
- Jest

**Backend:**

- ExpressJS
- Mongoose
- MongoDB

## Features

**SCREENS**

- Login Screen
- Signup Screen
- Quiz Listing Screen
- Quiz Screen
  _ Instructions Screen
  _ Quiz Question Screen \* Result Screen

**FUNCTIONALITY**

- User needs to Signup & Login to view the Quiz Listing Page.
  - Guest Login credentails can be used in case, someone doesn't wan't to Signup.
- After Login user can see all the available quiz.
- For a particular quiz, the questions, the scores for correct and incorrect answers can be configured from the backend.
- Once the user completes a particular quiz and clicks 'Go to Dashboard', the quizId for the same is stored in the Database, so next time the user logins, they'll be able to see which quiz they've attempted.

## Work in Progress

- Convert this project to Typescript.
- Display previous best score for that quiz scored by that user.
- Dark Mode
- More Quiz and relevant questions.
