# Textify (Block-Based Note and Text Editor)

[**Live Demo**](https://itmo-textify.netlify.app/)

This project is a **React + TypeScript + Vite** template combined with a block-based text editor concept called **Textify**. Textify is designed for collaborative note creation, version control, AI-driven text processing, and more. Below, you’ll find detailed information on the project’s purpose, structure, features, architecture, and setup.

---

## Table of Contents

1. [Project Overview](#project-overview)  
2. [Key Features](#key-features)  
3. [Tech Stack](#tech-stack)  
4. [Architecture](#architecture)  
   - [User Flow](#user-flow)  
   - [Data Flow Diagram](#data-flow-diagram)  
   - [Overall Architecture](#overall-architecture)  
   - [Component Architecture](#component-architecture)  
5. [Installation & Setup](#installation--setup)  
6. [ESLint Configuration](#eslint-configuration)  
   - [Expanding ESLint Rules](#expanding-eslint-rules)  
7. [Testing](#testing)  
8. [Project Structure & Key Components](#project-structure--key-components)  
9. [Additional Notes](#additional-notes)  
10. [Contributing](#contributing)  

---

## Project Overview

**Textify** is a block-based text and note editor that allows multiple users to collaborate in real-time. It provides version control, text formatting, AI-powered text generation, and more. The project is built with **React** and **TypeScript**, using **Vite** for lightning-fast development and bundling. The backend is implemented with **Node.js**, although you can integrate your own backend or serverless functions as needed.

### Why This Project?

- **Collaboration**: Real-time document editing for multiple users.  
- **Flexibility**: Block-based architecture for composing and rearranging different types of content.  
- **AI-Enhanced**: Integration with OpenAI APIs for text generation, summarization, or any custom AI-powered features.  
- **Scalability**: Built on top of modern technologies like React, Vite, and TypeScript, making it easy to extend, maintain, and scale.

---

## Key Features

1. **Block-Based Editor**  
   - Organize content into discrete blocks (text, images, embeds, etc.).  
   - Customize layout and styling easily.

2. **Real-Time Collaboration**  
   - Multiple users can edit notes simultaneously.

3. **Version Control**  
   - Track changes over time and revert to previous versions.

4. **AI/Language Model Support**  
   - Integration with [OpenAI API](https://platform.openai.com/docs/introduction) for text generation, summarization, etc.

5. **Spell Checking**  
   - Uses [Yandex Speller API](https://yandex.ru/dev/speller) to detect and correct spelling mistakes.

6. **Customization**  
   - Modify the look and feel of blocks, themes, and the overall UI.

7. **Search & Replace**  
   - Quickly find and replace text within notes and documents.

8. **Analytics & Monitoring**  
   - [Yandex Metrika](https://yandex.ru/dev/metrika) for tracking user activity.  
   - [Sentry](https://sentry.io/) for error reporting and performance monitoring (optional).

---

## Tech Stack

### Frontend

- **[React](https://react.dev/)** – A powerful library for building user interfaces. React allows for the creation of reusable components and efficient rendering of dynamic data.
- **[Redux](https://redux.js.org/)** – A predictable state container, ideal for complex applications. Redux helps manage the application state in a consistent and predictable manner.

### Backend

- **Node.js** – A JavaScript runtime used for server-side logic. Node.js allows for building scalable network applications.

### Build System

- **[Vite](https://vite.dev/)** – A fast build tool that leverages native ES modules. It offers quick cold starts and lightning-fast HMR (Hot Module Replacement).

### Libraries & Utilities

- **[Axios](https://axios-http.com/)** – For HTTP requests to your backend or external APIs. Axios simplifies making HTTP requests and handling responses.
- **[Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)** – Handle complex or CPU-intensive tasks in the background without blocking the UI. Web Workers allow for running scripts in background threads.
- **[Material UI](https://mui.com/material-ui/)** – A popular React UI library with a comprehensive set of styled components and icons. Material UI provides a consistent and customizable design system.

### Testing

- **[Cypress](https://www.cypress.io/)** – End-to-end testing framework suitable for UI and integration tests. Cypress provides a robust environment for testing the entire application flow.
- **[Vitest](https://vitest.dev/)** – A blazing-fast unit testing framework optimized for Vite. Vitest allows for writing and running unit tests efficiently.

### External Services

- **[Yandex Metrika](https://yandex.ru/dev/metrika)** – For user analytics and tracking. Yandex Metrika helps monitor user interactions and gather insights.
- **[Supabase](https://supabase.com/)** (Optional) – For database and authentication. Supabase provides real-time data synchronization and authentication services.

---

## Architecture

Below are various diagrams that showcase how the system is structured, how data flows, and how components interact.

### User Flow

```txt
┌───────────┐
│   Login   │
└───────────┘
     │
     ▼
┌────────────┐
│  Dashboard │
└────────────┘
     │
     ▼
┌──────────────────┐
│  Select or Create │
│    a Document     │
└──────────────────┘
     │
     ▼
┌──────────────────┐
│ Collaborative    │
│   Editing (RTE)  │
└──────────────────┘
     │
     ▼
┌───────────────────────┐
│  Save, Share, Export  │
└───────────────────────┘
```

### Data Flow Diagram

```txt
┌──────────────┐
│   Frontend    │
│ (React + RTE) │
└──────────────┘
      │  \
      │   \
      ▼    \
┌───────────────────┐
│   API (Axios)     │
└───────────────────┘
      │
      ▼
┌────────────────┐
│  Database/     │
│  Supabase      │
└────────────────┘
```

### Overall Architecture

```txt
          Frontend (React + Vite + TypeScript)
           /           |                  \
          /            |                   \
   Redux Store     Material UI         External APIs
          \            |                   /
           \           |                  /
             ----------+--------------
                       |
                    Backend
                  (Node.js or
               your preferred server)
                       |
                   Database
                 (e.g., Supabase,
               PostgreSQL, MongoDB)
```

### Component Architecture

```txt
┌──────────────────────────┐
│   App (Root Component)   │
└──────────────────────────┘
            │
            ▼
┌──────────────────────────┐
│  Router / Navigation     │
└──────────────────────────┘
            │
            ▼
┌───────────────────────────┐
│  Main Layout / Container  │
└───────────────────────────┘
            │
            ▼
┌──────────────────────────┐
│   Block Editor (RTE)     │
└──────────────────────────┘
            │
            ├─────────────→ (Block Components)
            │      TextBlock, ImageBlock, etc.
            │
            └─────────────→ (Utility Components)
                   Toolbar, Sidebar, etc.
```

---

## Installation & Setup

> **Note:** The project is currently in active development, so some features may still be in progress.

1. **Clone the repository**  
   ```bash
   git clone https://github.com/YourOrganization/textify.git
   cd textify
   ```

2. **Install dependencies**  
   ```bash
   npm install
   ```
   or  
   ```bash
   yarn install
   ```

3. **Start the development server**  
   ```bash
   npm run dev
   ```
   or  
   ```bash
   yarn dev
   ```
   - This will start the Vite development server.  
   - Visit `http://localhost:5173` in your browser (or the port specified in your console) to see the application.

4. **Build for production**  
   ```bash
   npm run build
   ```
   or  
   ```bash
   yarn build
   ```
   - Outputs the production-ready files to the `dist` directory.

5. **Preview production build**  
   ```bash
   npm run preview
   ```
   or  
   ```bash
   yarn preview
   ```
   - Serves the `dist` build locally for testing.

---

## ESLint Configuration

This template comes with a minimal ESLint setup for React + TypeScript. It integrates well with Vite and includes some recommended rules for consistency and quality.

### Expanding ESLint Rules

If you’re planning to build a production application, you might want to enable type-aware lint rules:

1. **Configure Parser Options**  
   In your `eslint.config.js`, set the `parserOptions` property:

   ```js
   export default tseslint.config({
     languageOptions: {
       // other options...
       parserOptions: {
         project: ['./tsconfig.node.json', './tsconfig.app.json'],
         tsconfigRootDir: import.meta.dirname,
       },
     },
   })
   ```

2. **Use Type-Checked Rules**  
   Replace `tseslint.configs.recommended` with one of the following:
   - `tseslint.configs.recommendedTypeChecked`
   - `tseslint.configs.strictTypeChecked`

   Optionally add:
   - `...tseslint.configs.stylisticTypeChecked`

3. **Add React ESLint Plugin**  
   Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update `eslint.config.js`:

   ```js
   // eslint.config.js
   import react from 'eslint-plugin-react'
   import tseslint from '@typescript-eslint/eslint-plugin' // or your setup

   export default tseslint.config({
     // Set the React version
     settings: {
       react: { version: '18.0' },
     },
     plugins: {
       // Add the react plugin
       react,
     },
     rules: {
       // other rules...
       ...react.configs.recommended.rules,
       ...react.configs['jsx-runtime'].rules,
     },
   })
   ```

---

## Testing

1. **Unit and Integration Testing**:  
   - **[Vitest](https://vitest.dev/)** is configured for running tests quickly with minimal overhead.  
   - Create test files with `.test.ts` or `.spec.ts` extensions.

   ```bash
   npm run test
   ```
   or  
   ```bash
   yarn test
   ```

2. **End-to-End (E2E) Testing**:  
   - **[Cypress](https://www.cypress.io/)** is used for E2E testing.  
   - Scripts in the `package.json` may include commands like `npm run cypress:open` or `npm run cypress:run`.

---

## Project Structure & Key Components

Here is a high-level look at the directory structure (may vary depending on your specific setup):

```
.
├── public/                  # Static assets
├── src/
│   ├── assets/             # Images, icons, etc.
│   ├── components/         # Reusable components
│   ├── features/
│   │   └── editor/         # Block-based editor
│   ├── pages/              # Page components (e.g. dashboard, auth, etc.)
│   ├── redux/              # Redux store, slices
│   ├── services/           # API calls (e.g., Axios, Supabase interactions)
│   ├── tests/              # Unit/Integration test files (if separated)
│   ├── App.tsx
│   └── main.tsx
├── .eslintrc.js            # ESLint configuration
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite configuration
├── package.json
└── README.md
```

### Highlights

- **API & Services**: Contains logic for CRUD operations on documents/pages via Supabase or any other database.  
- **Components**: Includes general-purpose components (e.g., layout, navigation) and specialized ones (e.g., project cards, editors).  
- **Redux**: Manages application-wide state for consistency across components.

---

## Additional Notes

- **Sentry Integration**: The project can be integrated with [Sentry](https://sentry.io/) for error reporting and performance monitoring. Check your `package.json` or environment files for configuration details.  
- **Analytics**: For tracking user interactions, [Yandex Metrika](https://yandex.ru/dev/metrika) is used. You can swap this out for Google Analytics or any other service.  
- **Storybook**: If you want to develop components in isolation, you can integrate [Storybook](https://storybook.js.org/). Scripts are typically found in `package.json`, such as `npm run storybook`.  
- **Supabase**: Some parts of the code may showcase integration with Supabase for real-time data, authentication, and more. This is optional and can be replaced or extended.  
- **Contributing**: Contributions are welcome! Please see the [Contributing Guidelines](#contributing) for more information.

---

## Contributing

We welcome contributions to improve Textify! Here are some ways you can contribute:

1. **Report Bugs**: If you find a bug, please report it by opening an issue on GitHub.
2. **Suggest Features**: Have an idea for a new feature? Open an issue to discuss it.
3. **Submit Pull Requests**: If you want to contribute code, please fork the repository and submit a pull request. Make sure to follow the project's coding standards and guidelines.
4. **Improve Documentation**: Help us improve the documentation by making it clearer and more comprehensive.

### How to Contribute

1. **Fork the Repository**: Click the "Fork" button at the top right of the repository page.
2. **Clone Your Fork**: Clone your forked repository to your local machine.
   ```bash
   git clone https://github.com/YourUsername/textify.git
   cd textify
   ```
3. **Create a Branch**: Create a new branch for your feature or bugfix.
   ```bash
   git checkout -b feature/your-feature-name
   ```
4. **Make Changes**: Make your changes to the codebase.
5. **Commit Changes**: Commit your changes with a descriptive commit message.
   ```bash
   git commit -m "Add feature: your feature description"
   ```
6. **Push Changes**: Push your changes to your forked repository.
   ```bash
   git push origin feature/your-feature-name
   ```
7. **Open a Pull Request**: Go to the original repository and open a pull request with a description of your changes.

Thank you for contributing to Textify!

---
````
