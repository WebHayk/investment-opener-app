Investment Opener App
===========================================================================

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) with `--template typescript`option.

On the top of it, the following features have been added with relatively small changes:

* TypeScript supports for Electron main process source code
* Hot-reload support for Electron app
* Electron Builder support

## About project

Your all-in-one investment companion designed to simplify and elevate your financial journey. Whether you're a seasoned investor or just starting, our app empowers you with the tools and insights needed to make informed investment decisions.

## Available Scripts in addition to the existing ones

### `npm run electron:dev`

Runs the Electron app in the development mode.

The Electron app will reload if you make edits in the `electron` directory.<br>
You will also see any lint errors in the console.

### `npm run electron:build`

Builds the Electron app package for production to the `dist` folder.

Your Electron app is ready to be distributed!

## Project directory structure

```bash
my-app/
├── package.json
│
## render process
├── tsconfig.json
├── public/
├── src/
│
## main process
├── electron/
│   ├── main.ts
│   └── tsconfig.json
│
## build output
├── build/
│   ├── index.html
│   ├── static/
│   │   ├── css/
│   │   └── js/
│   │
│   └── electron/
│      └── main.js
│
## distribution packages
└── dist/
    ├── mac/
    │   └── my-app.app
    └── my-app-0.1.0.dmg
```

