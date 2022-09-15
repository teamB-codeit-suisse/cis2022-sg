# cis2022-sg

## Getting Started

### Dependencies (macOS)

You will need `npm` and `node` to install the dependencies.

```sh
$ brew install nvm
```

At the point of writing, `scamshield-reporting/backend` uses `node v16.14.2`. We can run `nvm install` in the `backend` directory, and `.nvmrc` will inform `nvm` with the appropriate version to install.

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
# Ensure the database is running
$ npm run dev
```

## Code Tools

```sh
# Linting
$ npm run lint
```
