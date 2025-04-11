# DevOps Git Demo

A demonstration project for implementing DevOps Git best practices including branching strategies, pull requests, and version control.

## Project Overview

This is a simple Node.js/Express API that demonstrates how to properly structure a Git repository for a DevOps workflow. The application includes authentication and user management functionality.

## Features

- User authentication with role-based access control
- User management (CRUD operations)
- Admin protected routes
- RESTful API design
- Proper Git branching strategy (main, dev, feature branches)
- Pull request workflow
- Versioning with Git tags
- Comprehensive documentation

## Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm 8.x or higher
- Git

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/devops-git-demo.git
   cd devops-git-demo
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm run dev
   ```

4. Access the API at `http://localhost:3000`

## API Documentation

See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for detailed information about all available endpoints.

## Development Workflow

### Branching Strategy

This project follows a simple but effective branching strategy:

- `main`: Production-ready code
- `dev`: Development integration branch
- `feature/*`: Individual feature branches

### Working on Features

1. Create a feature branch from `dev`:
   ```bash
   git checkout dev
   git pull origin dev
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and commit them:
   ```bash
   git add .
   git commit -m "Descriptive commit message"
   ```

3. Push your branch to GitHub:
   ```bash
   git push -u origin feature/your-feature-name
   ```

4. Create a pull request to merge your changes into the `dev` branch

### Releasing

1. Merge `dev` into `main`:
   ```bash
   git checkout main
   git merge dev
   ```

2. Create a version tag:
   ```bash
   git tag -a v1.0.0 -m "Version 1.0.0"
   git push origin v1.0.0
   ```

## License

This project is licensed under the MIT License - see the LICENSE file for details.