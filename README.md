react-todo-list
=
React sample project

![preview image](https://raw.githubusercontent.com/PKief/react-todo-list/gh-pages/img/app-preview.gif)

[Run the app in browser](https://pkief.github.io/react-todo-list/)

## Instructions
### Get it up and running
All you need to do is to clone the source files and double click on the `index.html`-file to run the application on your local device.

### Compile source code
Install all required packages:
```terminal
npm install
```
Run gulp:
```terminal
gulp
```
Gulp runs babel and a sass compiler. We need babel to compile the jsx-files into js-files and the sass compiler to transpile the sass-files into browser-readable css-files.

Our gulpfile watches for file-changes so you do not need to refresh it after every change in the code. Currently you need to **refresh your browser window** to apply the changes.