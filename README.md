# TA-SDK-Example

This repository contains a React-based starter app for using the [![NPM](https://nodei.co/npm/ta-agent-sdk.svg?style=mini)](https://nodei.co/npm/ta-agent-sdk/)

## Live Demo

The app is deployed at: https://ta-agent-sdk.netlify.app/

## Setup

### Environment Configuration

Create a `.env` file in the root directory and add backend host:

```env
REACT_APP_BACKEND_HOST=backend_host_url
```

### Installation and Start

```bash
npm install
npm start
```

### Build for Production

```bash
npm build
```

## Development

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
Project consists of:

- an Event-emitting websocket-client to ease communication between the websocket and the front-end
- communication layer for processing audio in and out
- a boilerplate view for starting to build your apps and view logs

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!
