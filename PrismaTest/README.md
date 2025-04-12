# Todo Application

This is a simple Todo application built with Next.js. The application allows users to manage their tasks by adding, editing, and deleting todos. 

## Project Structure

```
PrismaTest
├── components
│   ├── Header
│   │   └── index.jsx          # Header component for the application
│   ├── TodoApp
│   │   ├── index.jsx          # Main TodoApp component
│   │   ├── TodoList
│   │   │   ├── index.jsx      # Component to display the list of todos
│   │   │   └── TodoItem.jsx   # Component representing an individual todo item
│   │   ├── AddTodo
│   │   │   └── index.jsx      # Component for adding new todos
│   │   └── EditTodo
│   │       └── index.jsx      # Component for editing existing todos
├── pages
│   └── api
│       └── get-todos.js       # API route for fetching todos
├── styles
│   └── globals.css            # Global styles for the application
├── package.json                # npm configuration file
├── next.config.js             # Next.js configuration settings
└── README.md                   # Project documentation
```

## Features

- **Add Todos**: Users can add new tasks to their todo list.
- **Edit Todos**: Users can edit existing tasks.
- **Delete Todos**: Users can remove tasks from their list.
- **Toggle Completion**: Users can mark tasks as complete or incomplete.

## Getting Started

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd PrismaTest
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Run the development server:
   ```
   npm run dev
   ```

5. Open your browser and go to `http://localhost:3000` to view the application.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License.