# IM531_ProjectT2 - Edon

## Summary

**Edon** is a graphical interface for starting and managing Node.js servers in a similar way that **MAMP** or **Xampp** is for PHP.

## Windows Build

A build for Windows can be downloaded [here](https://www.dropbox.com/s/tbybyswpvzvhkkt/edon%20Setup%201.0.0.exe?dl=0).

## Team Members
* David Messerer
* Sarah Schütz

## How it works

**Edon** will help you to be more productive when working with multiple node driven servers and multiple applications.

Projects can be created or selected using the "Select Project" dropdown. For each project a project root directory needs to be specified. Then multiple servers can be configured for each project. As soon as the wanted command is entered, the wanted task can be started. Typical commands are `npm start`, `webpack --watch`, `gulp dev` etc. To be sure that the wanted task will run correctly the command needs to be installed globally on the computer and the configuration file for the specified task must be found in the given root directory.

The second icon in the menu bar on the left is to start a static fileserver for simple static websites or random test cases. All you need to do is select a root directory with an `index.html` file and you are good to go. 

## Setup & Folder Structure

The project is set up using **Electron**, **React** and **Redux**. Also an **Express.js** server is included to provide a static Webserver.

The Node version used for development is 7.2.0.
The Version of electron is 1.7.0 and the NODE version used by electron is 7.9.0.

**Yarn** is used to load dependencies. All used versions are stored in yarn.lock.

The configuration files like the `.gitignore`, `package.json` and `webpack.config.js` files are in the project root directory as well as all installed node modules. Furthermore the project root directory contains the folders `app`, `build`, `dist`, `public` and `server`.

The `app` directory contains all relevent source code for the app like all **React components** the js files for **Redux** and the `main.js` file for the **Electron main process**. The entry point for React is the index.js file.

The build and the `dist` directory are for building the app. The `dist` directory is in the `.gitignore` and is only present when the app is built.

The `public` directory contains all **static files** like images and the `index.html` file. Also the static `style.css` and the **bundled javascript** can be found in this directory.

The `server` directory contains only the **configuration of the express server** which is only used by the app to start a static web server in a given directory. The app itself doesn't use any webserver because it is not needed. The routing is done via the **React HashRouter**.

## Workflow

After the first download of the source code `npm install` or `yarn` must be run in the **project root directory**.

All necessary scripts to run the project can be found in the `package.json` file. The electron app is started using `npm start`. To build the react part of the application a webpack server is used. The webpack server should be started using `npm run watch`. When running the project for the first time webpack needs to run before the app can be started, because the `bundle.js` file needs to be created. The development tools are not shown but can be uncommented in the `main.js` file.

When using dev tools it is **important not to reload the project** while any background process is running. If done so, the process will not be stopped and the application will still think the the server is running, but trying to stop the process/server will result in an error because the reference to the process is gone. This however is not a problem in production because the window cannot be reloaded.

To sum it up, you can run the project as follows:
1. `npm install` or `yarn`
2. `npm run watch`
3. when webpack is started and `bundle.js` file is created `npm start`

## Data Storage

The configuration of the projects and server is stored in json files using the **electron-store** module in the specified default directory of the bundle ([see](https://github.com/sindresorhus/electron-store)). The 2 files generated are `project-store.json` and `server-store.json`. The processes are not stored because they will be stoped anyway if the application is closed.

## Tests

Some tests can be found in the `app/test` folder. The tests can be run using `npm run test`.

## Building


To build the app **electron-builder** module is used. A build can be created by running `npm run dist` like specified in the `package.json` file. Before building the link where the node server is started from has to be changed to `node resources/app/server/server.js` in the file `app/store/states/server.js`. Otherwise the static file server will not work in the build. The build can then be found in the dist folder of the project. A build for Windows can be downloaded [here](https://www.dropbox.com/s/tbybyswpvzvhkkt/edon%20Setup%201.0.0.exe?dl=0).


## OS Compatibility

The application has been tested on **Windows** and **Mac OSX**. Proper functionality on **Linux** is likely but cannot be guaranteed.
