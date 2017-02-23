# Othello Project
This is our othello project.

# How to setup!
1. run `npm install`
2. Smile, you deserve to be happy.

# How to run!
1. run `npm start`
2. Open [http://localhost:8080/webpack-dev-server/](http://localhost:8080/webpack-dev-server/) in your browser.
3. (optional) You can also open up [http://localhost:8080/](http://localhost:8080/) in your browser, but you won't get the fancy refresh-on-save stuff. ( You also won't get the bar this way. )

# What are all these folders?

### `build`
This is your compiled code. [Webpack](https://webpack.github.io/) (the thing that
does the autorefresh) takes all the javascript files and sticks them together
when it sees a `require` call. This makes sure we don't have to have 1 giant
javascript file (ewwww).

** You should not edit these files as they are overwritten every time you save a file in src. **

### `src`
This is where the real code lives! Edit these files.

### `node_modules`
This is where third party libraries live. (it's also where webpack and its dependencies live). Don't edit anything in this. I would not recommend peering into its depths.

### `package.json`
This is the config file of the project. It's an [npm](https://www.npmjs.com/) thing, and it's primary purpose is to store which dependencies (third party libraries) we've added to the project.

### `webpack.config.js`
This is the configuration file for `webpack`, the autorefresher. It's pretty much a write once, never touch again file. So you probably don't need to touch it.

### `yarn.lock`
If you see this file, ignore it because it means Evan was dumb and left it in.
