# cis2022-sg

- This server used by team B (SG 1st runner up) for the 2022 Credit Suisse Coding Challenge.

## Tech Stack
- Typescript with express framework
- Eslint and prettier for code styling
- (Tests) Jest framework used for locally E2E test
- (CI/CD) Heroku pipeline to automatically deploy PRs and Commits to `master` branch

## Getting Started

### Dependencies

You will need `npm` and `node` to install the dependencies.

```sh
$ brew install nvm
```

At the point of writing, `cis2022-sg` uses `node v16.14.2`. We can run `nvm install` in the main directory, and `.nvmrc` will inform `nvm` with the appropriate version to install.

```sh
$ nvm install
$ node --version
# 16.14.2
```

We can now install the necessary dependencies.

```sh
# Install dependencies
$ npm install
```

## Run

```sh
$ npm run dev
```

## Run Tests

```sh
$ npm run test
# Run all the tests

$ npm run test -- tests/<filename>
# Run specific test file
```

## Code Tools

```sh
# Linting
$ npm run lint
```
