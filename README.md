# Nimble Tech Test : Full Stack Shopping list

## Overview

This mono repo comprises a react frontend, built with create react app, and a nodejs express API to deliver an **SPA for managing lists**. The project was scaffolded by a bash script I wrote, to create the basic folder structure and install the required packages. Code was written in typescript with a test-first approach, with additional test coverage/depth added later.

Features include:
- ability to create multiple lists
- ability to add items to individual lists, which can be individually marked as complete and deleted

Technical features include:
- shared node_modules and scripts in the root
- eslint and prettier for linting and formatting code
- husky pre-commit and pre-push hooks
- a primitive implementation of dependency injection in the express app
- swagger docs for api endpoints
- storybook for react components
- styled components for scoped styles
- mongodb implementation based on generic db interface


## Running the App

### 0. Prerequisites
 
- Docker installed with docker-compose
- PORTS 3000, 4500, and 6006 free

### 1. Spin up the MERN stack with the following command:

- `make ready-dev`

### 2. Configure your .env files:
  - `./backend/.env` : copy the contents of ./backend/.env.example and then replace the host ip in DB_URI with the output of `make db-ip` 

  - `./frontend/.env` : if you're using the default host and port for the backend, just copy the contents of ./frontend/.env.example

### 3. Access the resources at the following urls:

- frontend : http://localhost:3000
- storybook : http://localhost:6006
- backend : http://localhost:4500
  - swagger docs: http://localhost:4500/api/docs


## Running the Tests

Tests are written with Jest and React Testing Library, and can be run via npm scripts from the root, backend, and frontend directories OR with the following *make* commands:

- `make test`
- `make test-coverage`

## Reflections

### Future Work
I have left various 'TODO' comments in the codebase  as indications of where I'd like to spend more time if I had it.

From the testing perspective, the addition of some E2E framework e.g. Playwright or Cucumber to test behaviours and use journeys would be desirable. In a real world scenario, we'd also want to implement some form of load testing, e.g. with K6.

In terms of code and features, an auth implementation to protect endpoints and only show user's their own lists would be a good next step. There are also refactors that could be made to things like the DI implementation and the way the React app interacts with the API.

### Challenges
The biggest difficulty in completing this project was trying to avoid  javascript patterns in favour of utilising typescript, after a couple of years of not using it (and having exclusively used it in Angular projects before then). In particular, this made writing tests slow painful as the mocking patterns and so on that I'm familiar with would not work. It was also my first time using react testing library. 