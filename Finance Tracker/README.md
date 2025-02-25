# Budget Management Dashboard

## Overview
This is a Budget Management Dashboard built with React, Redux, TypeScript, Material-UI (MUI), and Framer Motion for animations. The app helps users manage their budgets, track transactions, and monitor wallet balances effectively.

## Features
- View and manage budgets
- Track transactions with sorting and pagination
- Display wallet balance
- Animated UI using Framer Motion
- Navigation with React Router

## Tech Stack
- **Frontend**: React, TypeScript, Redux, Material-UI (MUI), Framer Motion
- **State Management**: Redux Toolkit
- **Routing**: React Router

## Installation
1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the development server:
   ```sh
   npm run dev
   ```




## Error Handling
This project uses `react-error-boundary` to handle component-level and global-level errors.

- **Component-Level Error Boundary:**
  ```tsx
  import { ErrorBoundary } from 'react-error-boundary';
  
  const ErrorFallback = ({ error, resetErrorBoundary }) => (
    <div>
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
      <button onClick={resetErrorBoundary}>Try Again</button>
    </div>
  );

  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <YourComponent />
  </ErrorBoundary>
  ```

- **Global-Level Error Boundary:**
  Wrap your entire app inside `ErrorBoundary` in `App.tsx`:
  ```tsx
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <App />
  </ErrorBoundary>
  ```

## License
This project is licensed under the MIT License.

